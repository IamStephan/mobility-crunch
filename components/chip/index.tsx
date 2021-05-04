import React from "react"
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
} from "react-native"
import { Gray } from "../../constants/colors"

import { Border, Green, Spacing, TypographySizes } from "../../theme"

interface Props {
  title: string
  action?: () => void
  disabled?: boolean
  containerStyle?: ViewStyle
  style?: ViewStyle
}

const Button: React.FC<Props> = ({
  title,
  action,
  disabled,
  containerStyle,
  style,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity onPress={action} disabled={disabled}>
        <View style={[styles.button, style]}>
          <Text numberOfLines={1} style={styles.text}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  button: {
    borderWidth: Border.width,
    borderColor: Green.green800,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 999,
  },
  text: {
    fontSize: TypographySizes.xs,
    color: Green.green600,
    textAlign: "center",
    textTransform: "capitalize",
  },
})

export default Button
