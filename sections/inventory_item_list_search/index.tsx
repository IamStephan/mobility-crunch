import React from "react"
import { View, StyleSheet } from "react-native"

import Searchbox from "../../components/search"
import Layout from "../../constants/layout"

interface Props {
  onSearch: (text: string) => void
}

const InventoryItemListSearchSection: React.FC<Props> = ({ onSearch }) => {
  return (
    <View style={styles.container}>
      <Searchbox
        onSearch={onSearch}
        iconName="plus-circle-outline"
        placeholder="Product Name..."
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.spacing * 2,
  },
})

export default InventoryItemListSearchSection
