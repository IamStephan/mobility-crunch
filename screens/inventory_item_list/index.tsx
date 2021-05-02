import React, { useState, useCallback } from "react"
import { View, StyleSheet } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"

import { useProductsData } from "../../database_hooks"
import InventoryItemListSearchSection from "../../sections/inventory_item_list_search"
import InventoryItemListListSection from "../../sections/inventory_item_list_list"

const InventoryItemListScreen: React.FC<StackScreenProps<{}>> = ({
  navigation,
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const { data = [], state } = useProductsData(searchTerm)

  // Handle search term changes
  const _handleOnSearch = useCallback(
    (text: string) => {
      setSearchTerm(text)
    },
    [setSearchTerm]
  )

  return (
    <View style={styles.screen}>
      <InventoryItemListSearchSection
        navigateTo={navigation.navigate}
        onSearch={_handleOnSearch}
      />
      <InventoryItemListListSection
        navigateTo={navigation.navigate}
        data={data}
        loading={state.loading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})

export default InventoryItemListScreen
