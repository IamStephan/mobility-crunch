import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { Title, Caption } from "react-native-paper"

import LoadingSwitch from "../../components/loading_switch"
import LoadingText from "../../components/loading_text"
import Layout from "../../constants/layout"

interface Props {
  loading?: boolean
  quote?: number
  forma?: number
  invoice?: number
}

const LoadingStat: React.FC = () => {
  return (
    <LoadingText
      text="20069"
      Component={Text}
      style={styles.stat}
      alignText="center"
    />
  )
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
          <LoadingSwitch
            loading={loading}
            loadingComponent={<LoadingStat />}
            loadedComponent={<Text style={styles.stat}>{quote}</Text>}
          />
        </View>

        <View style={[styles.item, styles.itemSpace]}>
          <Caption style={styles.label}>Pro Forma</Caption>
          <LoadingSwitch
            loading={loading}
            loadingComponent={<LoadingStat />}
            loadedComponent={<Text style={styles.stat}>{forma}</Text>}
          />
        </View>

        <View style={styles.item}>
          <Caption style={styles.label}>Invoice</Caption>
          <LoadingSwitch
            loading={loading}
            loadingComponent={<LoadingStat />}
            loadedComponent={<Text style={styles.stat}>{invoice}</Text>}
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
