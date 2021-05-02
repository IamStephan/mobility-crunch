import React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"

import { Spacing, TypographySizes } from "../../theme"
import { Title, Paragraph } from "../text"
import Icon, { Props as IconProps } from "../icon"

interface Props {
  title: string
  subTitle?: string
  iconPrefixName?: string
  iconPrefixVariant?: IconProps["variant"]
  iconPrefixColor?: string
  iconSuffixName?: string
  iconSuffixVariant?: IconProps["variant"]
  iconSuffixColor?: string
  onPress?: () => void
}

const DropdownOption: React.FC<Props> = ({
  title,
  subTitle,
  iconPrefixName,
  iconPrefixVariant,
  iconPrefixColor,
  iconSuffixName,
  iconSuffixVariant,
  iconSuffixColor,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {!!iconPrefixName && (
        <View style={[styles.iconContainer, styles.iconPrefix]}>
          <Icon
            name={iconPrefixName}
            variant={iconPrefixVariant}
            size={TypographySizes.lg}
            color={iconPrefixColor}
          />
        </View>
      )}
      <View style={styles.textWrapper}>
        <View style={styles.textContainer}>
          <Title numberOfLines={1}>{title}</Title>
          {!!subTitle && <Paragraph>{subTitle}</Paragraph>}
        </View>
      </View>
      {!!iconSuffixName && (
        <View style={[styles.iconContainer, styles.iconSuffix]}>
          <Icon
            name={iconSuffixName}
            variant={iconSuffixVariant}
            size={TypographySizes.lg}
            color={iconSuffixColor}
          />
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing["2xl"],
  },
  textWrapper: {
    flex: 1,
  },
  textContainer: {
    paddingVertical: Spacing.lg,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconSuffix: {
    paddingLeft: Spacing.lg,
  },
  iconPrefix: {
    paddingRight: Spacing.lg,
  },
})

export default DropdownOption
