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

import { Spacing } from "../../theme"

interface Props {
  alignText: TextStyle["alignSelf"]
  text: string
  Component: typeof TextComponent
  style?: StyleProp<TextStyle>
}

const LoadingColor = "#efefef"

const AnimationConfig = {
  duration: 750,
  easing: Easing.inOut(Easing.quad),
}

const LoadingText: React.FC<Props> = ({
  alignText,
  text,
  Component,
  style,
}) => {
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

  return (
    <View style={ContainerStyles}>
      <View style={styles.textContainer}>
        <Component style={style}>{text}</Component>
      </View>

      <Animated.View style={[AnimContainerStyles, styles.loader]} />
    </View>
  )
}

const styles = StyleSheet.create({
  loader: {
    position: "absolute",
    top: Spacing.xs,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: Spacing.xs,
  },
  textContainer: {
    opacity: 0,
  },
})

export default LoadingText
