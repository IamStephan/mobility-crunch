import React, { useState, useEffect, useLayoutEffect, useCallback } from "react"
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  LayoutChangeEvent,
  StatusBar,
  BackHandler,
  ViewStyle,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Portal } from "@gorhom/portal"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated"

import ModalConfirmation from "./modal_confirmation"

import { PortalHosts } from "../../constants/portal_hosts"
import { Spacing } from "../../theme"

interface ModalComponents {
  Confirmation: typeof ModalConfirmation
}

export interface Props {
  isOpen: boolean
  layer?: number
  bottom?: React.ReactNode
  showBottom?: boolean
  top?: React.ReactNode
  showTop?: boolean
  onCloseRequest: () => void
  onModalClosed?: () => void
}

const AnimationConfig = {
  duration: 200,
  easing: Easing.inOut(Easing.quad),
}

const Modal: React.FC<Props> & ModalComponents = ({
  isOpen,
  layer = 1,
  bottom,
  showBottom,
  top,
  showTop,
  onCloseRequest,
  onModalClosed = () => {},
}) => {
  const [containerBottomHeight, setContainerBottomHeight] = useState(0)
  const [containerTopHeight, setContainerTopHeight] = useState(0)
  const [isLocalOpen, setIsLocalOpen] = useState(false)
  const [isLayoutReady, setIsLayoutReady] = useState(false)

  const { bottom: BottomPadding } = useSafeAreaInsets()

  const opacityV = useSharedValue(0)

  const bottomContainerSafePadding: ViewStyle = {
    paddingBottom: BottomPadding,
  }
  /**
   * Animation styles
   */
  const overlayAnimStyles = useAnimatedStyle(() => ({
    opacity: opacityV.value,
  }))

  const bottomContainerAnimStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(
          isOpen && showBottom
            ? 0
            : containerBottomHeight > 0
            ? containerBottomHeight
            : 9999,
          AnimationConfig
        ),
      },
    ],
  }))

  const topContainerAnimStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(
          isOpen && showTop
            ? 0
            : containerTopHeight > 0
            ? -containerTopHeight
            : -9999,
          AnimationConfig
        ),
      },
    ],
  }))

  /**
   * Styles of the container depending on
   * whether the layout height has been calculated
   * or not
   */
  const containerLayoutStyles = {
    opacity: isLayoutReady ? 1 : 0,
    // Allows for modals to be stacked
    zIndex: layer,
  }

  /**
   * Update animation values based on the open state
   * of the modal
   */
  useEffect(() => {
    if (isLayoutReady) {
      // Check for modal close state and run onModalClose props
      opacityV.value = withTiming(
        isOpen ? 1 : 0,
        AnimationConfig,
        (finished) => {
          "worklet"
          runOnJS(_handleModalClose)(!!isOpen, finished)
        }
      )
    }
  }, [isOpen, isLayoutReady])

  /**
   * Render Content only when modal isOpen
   * props is true
   */
  useLayoutEffect(() => {
    if (isOpen) {
      setIsLocalOpen(true)
    }
  }, [isOpen])

  /**
   * ANDROID SPECIFIC
   */
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (isOpen) {
          _handleCloseRequest()
          return true
        }

        return false
      }
    )

    return () => backHandler.remove()
  }, [isOpen])

  /**
   * When the layout has been calculated only then
   * make it possible to show the modal
   */
  useEffect(() => {
    // This should never be 0 since the container
    // already has padding inside of it
    if (!isLayoutReady) {
      if (containerBottomHeight || containerTopHeight) setIsLayoutReady(true)
    }
  }, [containerBottomHeight, containerTopHeight, isLayoutReady])

  /**
   * Calculate the height of the modal based on the content
   * inside of it
   *
   * Note:
   * this cannot be in a useCallback since
   * the arguments passed cannot be accessed
   * by the callback dependencies
   */
  const _handleBottomLayout = (e: LayoutChangeEvent) => {
    const height = e.nativeEvent.layout.height
    setContainerBottomHeight(height)
  }

  /**
   * Calculate the height of the modal based on the content
   * inside of it
   *
   * Note:
   * this cannot be in a useCallback since
   * the arguments passed cannot be accessed
   * by the callback dependencies
   */
  const _handleTopLayout = (e: LayoutChangeEvent) => {
    const height = e.nativeEvent.layout.height
    setContainerTopHeight(height)
  }

  /**
   * When the user presses the overlay backdrop
   * request the modal to be closed
   */
  const _handleCloseRequest = useCallback(() => {
    // Dismiss the keyboard if it where activated by any internal inputs
    Keyboard.dismiss()
    onCloseRequest()
  }, [onCloseRequest])

  /**
   * Only call the close prop when the the animation
   * is done and the modal is supposed to be closed
   */
  const _handleModalClose = useCallback(
    (isOpen: boolean, isFinished: boolean) => {
      if (!isOpen && isFinished) {
        onModalClosed()
        setIsLocalOpen(false)
      }
    },
    [onModalClosed]
  )

  if (!isLocalOpen) return null

  return (
    <Portal hostName={PortalHosts.modals}>
      <View
        pointerEvents={isLayoutReady && isOpen ? "auto" : "none"}
        style={[styles.constainer, containerLayoutStyles]}
      >
        <Animated.View style={[styles.overlay, overlayAnimStyles]}>
          <TouchableWithoutFeedback onPress={_handleCloseRequest}>
            <View style={styles.overlayPressable} />
          </TouchableWithoutFeedback>
        </Animated.View>

        <Animated.View
          style={[styles.menuTopContainer, topContainerAnimStyles]}
          onLayout={_handleTopLayout}
        >
          {/**
           * Weird negating logic to keep the top
           * open while its closing
           */}
          {!isLocalOpen && !showTop ? null : top}
        </Animated.View>

        <Animated.View
          style={[
            styles.menuBottomContainer,
            bottomContainerAnimStyles,
            bottomContainerSafePadding,
          ]}
          onLayout={_handleBottomLayout}
        >
          {/**
           * Weird negating logic to keep the bottom
           * open while its closing
           */}
          {!isLocalOpen && !showBottom ? null : bottom}
        </Animated.View>
      </View>
    </Portal>
  )
}

Modal.Confirmation = ModalConfirmation

const styles = StyleSheet.create({
  constainer: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  overlayPressable: {
    flex: 1,
  },
  menuBottomContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: Spacing.sm,
    borderTopRightRadius: Spacing.sm,
    paddingTop: Spacing.sm,
    left: 0,
    overflow: "hidden",
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  menuTopContainer: {
    backgroundColor: "white",
    borderBottomLeftRadius: Spacing.sm,
    borderBottomRightRadius: Spacing.sm,
    paddingBottom: Spacing.sm,
    paddingTop: StatusBar.currentHeight
      ? StatusBar.currentHeight + Spacing.sm
      : 0,
    left: 0,
    overflow: "hidden",
    position: "absolute",
    right: 0,
    top: 0,
  },
})

export default Modal
