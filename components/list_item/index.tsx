import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Caption } from "react-native-paper"
//@ts-ignore
import Icon from "@expo/vector-icons/MaterialCommunityIcons"

import TextLoadable from "../text_loadable"

interface Props {
  label: string
  value: string
  placeholderValue: string
  loading?: boolean
  iconName?: string
  action?: () => void
}

const ListItem: React.FC<Props> = ({
  label,
  value,
  placeholderValue,
  loading,
  iconName,
  action = () => {},
}) => {
  const IconStyles = {
    opacity: loading ? 0 : 1,
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Caption>{label}</Caption>
        <TextLoadable
          loading={loading}
          text={`${value}`}
          placeholderText={placeholderValue}
          Component={Text}
          alignText="flex-start"
          style={styles.textValue}
        />
      </View>

      {!!iconName && (
        <TouchableOpacity style={styles.iconContainer} onPress={action}>
          <Icon style={[styles.icon, IconStyles]} name={iconName} size={20} />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  textContainer: {
    flex: 1,
  },
  textValue: { fontSize: 18 },
  iconContainer: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    opacity: 0.75,
  },
})

export default ListItem
