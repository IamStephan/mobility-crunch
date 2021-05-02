import React from "react"
import { Text, TextProps, StyleSheet } from "react-native"

import { TypographySizes, TypographyFamily, Opacity, Gray } from "../../theme"

const Paragraph: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text {...rest} style={styles.text}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: TypographyFamily.regular,
    fontSize: TypographySizes.xs,
    // opacity: Opacity["opacity-50"],
    color: Gray.gray500,
  },
})

export default Paragraph
