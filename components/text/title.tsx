import React from "react"
import { Text, TextProps, StyleSheet } from "react-native"

import { TypographySizes, TypographyFamily, Spacing, Gray } from "../../theme"

const Title: React.FC<TextProps> = ({ children, style, ...rest }) => {
  return (
    <Text {...rest} style={[styles.text, style]}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: TypographyFamily.regular,
    fontSize: TypographySizes.md,
    marginBottom: Spacing.xs / 2,
    color: Gray.gray900,
  },
})

export default Title
