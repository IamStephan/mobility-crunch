import React from "react"
import {
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
  StyleSheet,
  TextComponent,
} from "react-native"
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSequence,
  withRepeat,
  Easing,
} from "react-native-reanimated"

import Layout from "../../constants/layout"

interface Props {
  loading?: boolean
  alignText: TextStyle["alignSelf"]
  text: string
  placeholderText: string
  Component: typeof TextComponent
  style?: StyleProp<TextStyle>
}

const LoadingColor = "#efefef"

const AnimationConfig = {
  duration: 750,
  easing: Easing.inOut(Easing.quad),
}

const TextLoadable: React.FC<Props> = ({
  loading,
  alignText,
  text,
  placeholderText,
  Component,
  style,
}) => {
  const textToDisplay = loading ? placeholderText : text

  const AnimContainerStyles = useAnimatedStyle(() => ({
    opacity: withRepeat(
      withSequence(
        withTiming(1, AnimationConfig),
        withTiming(0.5, AnimationConfig)
      ),
      -1,
      true
    ),
    backgroundColor: LoadingColor,
  }))

  const ContainerStyles: ViewStyle = {
    alignSelf: alignText,
  }

  const TextStyles: TextStyle = {
    opacity: loading ? 0 : 1,
  }

  return (
    <View style={ContainerStyles}>
      <Component style={[style, TextStyles]}>{textToDisplay}</Component>
      {!!loading && (
        <Animated.View style={[AnimContainerStyles, styles.loader]} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  loader: {
    position: "absolute",
    top: Layout.spacing / 2,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: Layout.spacing / 2,
  },
})

export default TextLoadable
