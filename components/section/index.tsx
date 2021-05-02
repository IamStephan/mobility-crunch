import React from "react"
import { View, StyleSheet } from "react-native"

import { Spacing, Green, TypographySizes, Border, Gray } from "../../theme"
import { Heading, SubHeading } from "../text"
import Icon, { Props as IconProps } from "../icon"

interface Props {
  heading?: string
  subHeading?: string
  indentChildrenWithIcon?: boolean
  showDivider?: boolean
  iconName?: string
  iconVariant?: IconProps["variant"]
}

const Section: React.FC<Props> = ({
  heading,
  iconName,
  iconVariant,
  subHeading,
  indentChildrenWithIcon = true,
  showDivider = true,
  children,
}) => {
  const ComputedSectionContentStyles = {
    paddingLeft:
      iconName && indentChildrenWithIcon ? Spacing.lg + TypographySizes.lg : 0,
  }

  return (
    <View style={styles.section}>
      {!!heading && (
        <View style={styles.sectionHeading}>
          {!!iconName && (
            <View style={styles.sectionHeadingIconContainer}>
              <Icon
                name={iconName}
                variant={iconVariant}
                color={Green.green500}
                size={TypographySizes.lg}
              />
            </View>
          )}
          <View style={styles.sectionHeadingTextContainer}>
            <Heading>{heading}</Heading>
            {!!subHeading && <SubHeading>{subHeading}</SubHeading>}
            {showDivider && <View style={styles.divider} />}
          </View>
        </View>
      )}

      <View style={ComputedSectionContentStyles}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing["2xl"],
  },
  sectionHeading: {
    marginBottom: Spacing.md,
    flexDirection: "row",
  },
  sectionHeadingTextContainer: {
    flex: 1,
  },
  sectionHeadingIconContainer: {
    // alignSelf: "center",
    marginRight: Spacing.lg,
  },
  divider: {
    marginTop: Spacing.md,
    borderBottomWidth: Border.width,
    borderColor: Gray.gray200,
  },
})

export default Section
