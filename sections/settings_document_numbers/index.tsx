import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { Title, Caption } from "react-native-paper"

import TextLoadable from "../../components/text_loadable"
import Layout from "../../constants/layout"

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
    paddingHorizontal: Layout.spacing * 2,
    marginBottom: Layout.spacing * 4,
  },
  title: {
    paddingBottom: Layout.spacing,
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
    alignContent: "center",
  },
  itemSpace: {
    marginHorizontal: Layout.spacing,
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
