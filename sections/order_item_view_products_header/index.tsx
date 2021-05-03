import React, { useCallback } from "react"
import { View, StyleSheet } from "react-native"

import { Spacing, Green, TypographySizes, Border, Gray } from "../../theme"
import { Heading } from "../../components/text"
import Icon from "../../components/icon"

const Section: React.FC = () => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeading}>
        <View style={styles.sectionHeadingIconContainer}>
          <Icon
            name="shopping"
            variant="materialCommunity"
            color={Green.green500}
            size={TypographySizes.lg}
          />
        </View>
        <View style={styles.sectionHeadingTextContainer}>
          <Heading>Products</Heading>
          <View style={styles.divider} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: Spacing.xl,
  },
  sectionHeading: {
    marginBottom: Spacing.md,
    flexDirection: "row",
  },
  sectionHeadingTextContainer: {
    flex: 1,
  },
  sectionHeadingIconContainer: {
    marginRight: Spacing.lg,
  },
  divider: {
    marginTop: Spacing.md,
    borderBottomWidth: Border.width,
    borderColor: Gray.gray200,
  },
})

export default Section
