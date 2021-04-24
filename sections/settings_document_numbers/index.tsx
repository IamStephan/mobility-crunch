import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { Title, Caption } from "react-native-paper"

import TextLoadable from "../../components/text_loadable"

interface Props {
  loading?: boolean
  quote?: number
  forma?: number
  invoice?: number
}

const SettingsDocumentNumbers: React.FC<Props> = ({
  loading,
  quote,
  forma,
  invoice,
}) => {
  return (
    <View style={styles.container}>
      <Title style={styles.title}>Current Numbers</Title>
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <Caption style={styles.label}>Quote</Caption>
          <TextLoadable
            loading={loading}
            text={`${quote}`}
            placeholderText="20069"
            Component={Text}
            alignText="center"
            style={styles.stat}
          />
        </View>

        <View style={[styles.item, styles.itemSpace]}>
          <Caption style={styles.label}>Pro Forma</Caption>
          <TextLoadable
            loading={loading}
            text={`${forma}`}
            placeholderText="20069"
            Component={Text}
            alignText="center"
            style={styles.stat}
          />
        </View>

        <View style={styles.item}>
          <Caption style={styles.label}>Invoice</Caption>
          <TextLoadable
            loading={loading}
            text={`${invoice}`}
            placeholderText="20069"
            Component={Text}
            alignText="center"
            style={styles.stat}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  title: {
    paddingBottom: 10,
    textAlign: "center",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "33%",
    borderRadius: 10,
    alignContent: "center",
  },
  itemSpace: {
    marginHorizontal: 10,
  },
  label: {
    textAlign: "center",
  },
  stat: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    color: "green",
  },
})

export default SettingsDocumentNumbers
