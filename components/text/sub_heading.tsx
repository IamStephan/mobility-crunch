import React from "react"
import { Text, TextProps, StyleSheet } from "react-native"

import { TypographySizes, TypographyFamily, Opacity } from "../../theme"

const Paragraph: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text {...rest} style={styles.text}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: TypographyFamily.light,
    fontSize: TypographySizes.xs,
  },
})

export default Paragraph
