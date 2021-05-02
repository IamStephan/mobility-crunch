import React from "react"
import { Text, TextProps, StyleSheet } from "react-native"

import { TypographySizes, TypographyFamily, Opacity } from "../../theme"

const Label: React.FC<TextProps> = ({ children, style, ...rest }) => {
  return (
    <Text {...rest} style={[styles.text, style]}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: TypographyFamily.regular,
    fontSize: TypographySizes.xs,
    opacity: Opacity["opacity-50"],
  },
})

export default Label
