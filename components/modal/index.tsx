import React, { useState, useEffect, useCallback } from "react"
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  // Types
  LayoutChangeEvent,
} from "react-native"
import { Portal } from "@gorhom/portal"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated"

import { PortalHosts } from "../../constants/portal_hosts"

export interface Props {
  isOpen: boolean
  layer?: number
  onCloseRequest: () => void
  onModalClosed?: () => void
}

const AnimationConfig = {
  duration: 200,
  easing: Easing.inOut(Easing.quad),
}

const Modal: React.FC<Props> = ({
  isOpen,
  layer = 1,
  onCloseRequest,
  onModalClosed = () => {},
  children,
}) => {
  const [containerHeight, setContainerHeight] = useState(0)
  const [isLayoutReady, setIsLayoutReady] = useState(false)

  const opacityV = useSharedValue(0)
  const transformXV = useSharedValue(0)

  /**
   * Animation styles
   */
  const overlayAnimStyles = useAnimatedStyle(() => ({
    opacity: opacityV.value,
  }))

  const containerAnimStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: transformXV.value }],
  }))

  /**
   * Styles of the container depending on
   * whether the lauout height has been calculated
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
    // Check for modal close state and run onModalClose props
    opacityV.value = withTiming(isOpen ? 1 : 0, AnimationConfig, (finished) => {
      "worklet"
      runOnJS(_handleModalClose)(!!isOpen, finished)
    })

    transformXV.value = withTiming(
      isOpen ? 0 : containerHeight,
      AnimationConfig
    )
  }, [isOpen])

  /**
   * When the layout has been calculated only then
   * make it possible to show the modal
   */
  useEffect(() => {
    // This should never be 0 since the container
    // already has padding inside of it
    if (containerHeight) {
      transformXV.value = containerHeight
      setIsLayoutReady(true)
    }
  }, [containerHeight])

  /**
   * Calculate the height of the modal based on the content
   * inside of it
   */
  const _handleLayout = useCallback((e: LayoutChangeEvent) => {
    const height = e.nativeEvent.layout.height
    setContainerHeight(height)
  }, [])

  /**
   * When the user presses the overlay backdrop
   * request the modal to be closed
   */
  const _handleCloseRequest = useCallback(() => {
    // Dismiss the keyboard if it where activated by any internal inputs
    Keyboard.dismiss()
    onCloseRequest()
  }, [])

  /**
   * Only call the close prop when the the animation
   * is done and the modal is supposed to be closed
   */
  const _handleModalClose = useCallback(
    (isOpen: boolean, isFinished: boolean) => {
      if (!isOpen && isFinished) {
        onModalClosed()
      }
    },
    []
  )

  return (
    <Portal name={PortalHosts.modals}>
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
          style={[styles.menuContainer, containerAnimStyles]}
          onLayout={_handleLayout}
        >
          {children}
        </Animated.View>
      </View>
    </Portal>
  )
}

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
  menuContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    left: 0,
    overflow: "hidden",
    position: "absolute",
    right: 0,
    bottom: 0,
  },
})

// TODO: Do not show backdrop color when it is stacked but still have it pressable

export default Modal
