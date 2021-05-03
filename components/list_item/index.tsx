import React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"

import { Spacing } from "../../theme"
import { Title, Paragraph } from "../text"
import Icon, { Props as IconProps } from "../icon"
import LoadingIcon from "../../components/loading_icon"
import LoadingText from "../../components/loading_text"

interface Props {
  title: string
  captions: Array<string>
  iconName?: string
  iconVariant?: IconProps["variant"]
  iconColor?: string
  onPress?: () => void
  onLongPress?: () => void
  onIconPress?: () => void
}

const ListItem: React.FC<Props> = ({
  title,
  captions,
  iconName,
  iconVariant,
  iconColor,
  onPress,
  onLongPress,
  onIconPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
          <View style={styles.textContainer}>
            <Title numberOfLines={1}>{title}</Title>
            <Paragraph>{captions.join("\n")}</Paragraph>
          </View>
        </TouchableOpacity>
      </View>
      {!!iconName && (
        <TouchableOpacity style={styles.iconContainer} onPress={onIconPress}>
          <Icon name={iconName} variant={iconVariant} color={iconColor} />
        </TouchableOpacity>
      )}
    </View>
  )
}

interface LoaderProps {
  hasIcon?: boolean
  title?: string
  captions?: Array<string>
}

export const ListItemLoader: React.FC<LoaderProps> = ({
  hasIcon,
  title = "Loading Title",
  captions = [],
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <View style={styles.textContainer}>
          <LoadingText
            Component={Title as any}
            alignText="flex-start"
            text={title}
          />
          {captions.map((caption, index) => (
            <LoadingText
              Component={Paragraph as any}
              alignText="flex-start"
              text={caption}
              key={index}
            >
              {caption}
            </LoadingText>
          ))}
        </View>
      </View>
      {!!hasIcon && (
        <View style={styles.iconContainer}>
          <LoadingIcon size={20} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  textWrapper: {
    flex: 1,
  },
  textContainer: {
    paddingVertical: Spacing.md,
  },
  iconContainer: {
    paddingLeft: Spacing.lg,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default ListItem
