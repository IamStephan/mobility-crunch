import React from "react"
import { View, StyleSheet } from "react-native"

import { Title, Label } from "../../components/text"
import LoadingText from "../loading_text"
import { Spacing } from "../../theme"

interface Props {
  label: string
  value: string
}

const ListField: React.FC<Props> = ({ label, value }) => {
  return (
    <View style={styles.container}>
      <Label>{label}</Label>
      <Title>{value}</Title>
    </View>
  )
}

interface LoaderProps {
  label: string
  placeholderValue: string
}

export const ListFieldLoader: React.FC<LoaderProps> = ({
  label,
  placeholderValue,
}) => {
  return (
    <View style={styles.container}>
      <Label>{label}</Label>
      <LoadingText
        Component={Title as any}
        text={placeholderValue}
        alignText="flex-start"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
})

export default ListField
