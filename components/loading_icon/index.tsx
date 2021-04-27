import React from "react"
import { View, StyleProp, TextStyle, ViewStyle, StyleSheet } from "react-native"
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSequence,
  withRepeat,
  Easing,
} from "react-native-reanimated"

interface Props {
  size: number
  style?: StyleProp<TextStyle>
}

const LoadingColor = "#efefef"

const AnimationConfig = {
  duration: 750,
  easing: Easing.inOut(Easing.quad),
}

const LoadingIcon: React.FC<Props> = ({ size, style }) => {
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

  const IconStyles: ViewStyle = {
    width: size,
    height: size,
  }

  return (
    <View style={style}>
      <Animated.View style={[styles.loader, AnimContainerStyles, IconStyles]} />
    </View>
  )
}

const styles = StyleSheet.create({
  loader: {
    borderRadius: 999,
  },
})

export default LoadingIcon
