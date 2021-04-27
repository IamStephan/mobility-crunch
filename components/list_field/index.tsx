import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Caption } from "react-native-paper"
//@ts-ignore
import Icon from "@expo/vector-icons/MaterialCommunityIcons"

import Layout from "../../constants/layout"
import LoadingText from "../loading_text"
import LoadingIcon from "../loading_icon"

interface Props {
  label: string
  value: string
  iconName?: string
  action?: () => void
}

const ListField: React.FC<Props> = ({
  label,
  value,
  iconName,
  action = () => {},
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Caption>{label}</Caption>
        <Text style={styles.textValue}>{value}</Text>
      </View>

      {!!iconName && (
        <TouchableOpacity style={styles.iconContainer} onPress={action}>
          <Icon style={styles.icon} name={iconName} size={20} />
        </TouchableOpacity>
      )}
    </View>
  )
}

interface LoaderProps {
  label: string
  placeholderValue: string
  hasIcon?: boolean
}

export const ListFieldLoader: React.FC<LoaderProps> = ({
  label,
  placeholderValue,
  hasIcon,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Caption>{label}</Caption>
        <LoadingText
          Component={Text}
          text={placeholderValue}
          style={styles.textValue}
          alignText="flex-start"
        />
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
    marginBottom: Layout.spacing * 2,
  },
  textContainer: {
    flex: 1,
  },
  textValue: { fontSize: 18 },
  iconContainer: {
    paddingHorizontal: Layout.spacing * 2,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    opacity: 0.75,
  },
})

export default ListField
