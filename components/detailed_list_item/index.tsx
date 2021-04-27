import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Caption } from "react-native-paper"
//@ts-ignore
import Icon from "@expo/vector-icons/MaterialIcons"

import Layout from "../../constants/layout"
import LoadingIcon from "../../components/loading_icon"
import LoadingText from "../../components/loading_text"

interface Props {
  title: string
  captions: Array<string>
  iconName?: string
  onPress?: () => void
  onIconPress?: () => void
}

const DetailedListItem: React.FC<Props> = ({
  title,
  captions,
  iconName,
  onPress,
  onIconPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={onPress}>
          <View>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {captions.map((caption, index) => (
              <Caption key={index}>{caption}</Caption>
            ))}
          </View>
        </TouchableOpacity>
      </View>
      {!!iconName && (
        <TouchableOpacity style={styles.iconContainer} onPress={onIconPress}>
          <Icon style={[styles.icon]} name={iconName} size={20} />
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

export const DetailedListItemLoader: React.FC<LoaderProps> = ({
  hasIcon,
  title = "Loading Title",
  captions = [],
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View>
          <LoadingText
            Component={Text}
            style={styles.title}
            alignText="flex-start"
            text={title}
          />
          {captions.map((caption, index) => (
            <LoadingText
              Component={Caption as any}
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
    marginVertical: Layout.spacing,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
  iconContainer: {
    paddingLeft: Layout.spacing * 2,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    opacity: 0.75,
  },
})

export default DetailedListItem
