import React from "react"
import { Text, TextProps, StyleSheet } from "react-native"

import { TypographySizes, TypographyFamily, Opacity } from "../../theme"

const Caption: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text {...rest} style={styles.text}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: TypographyFamily.regular,
    fontSize: TypographySizes.md,
    opacity: Opacity["opacity-75"],
  },
})

export default Caption
