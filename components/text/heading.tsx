import React from "react"
import { Text, TextProps, StyleSheet } from "react-native"

import { TypographySizes, TypographyFamily, Opacity } from "../../theme"

const Heading: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text {...rest} style={styles.text}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: TypographyFamily.bold,
    fontSize: TypographySizes.md,
  },
})

export default Heading
