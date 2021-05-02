import React, { useState, useCallback } from "react"
import { View, StyleSheet } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"

import { useOrdersData } from "../../database_hooks"
import OrderItemListSearchSection from "../../sections/order_item_list_search"
import OrderItemListListSection from "../../sections/order_item_list_list"

interface Props extends StackScreenProps<{}> {}

const OrderItemListScreen: React.FC<Props> = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const { data = [], state } = useOrdersData(searchTerm)

  // Handle search term changes
  const _handleOnSearch = useCallback(
    (text: string) => {
      setSearchTerm(text)
    },
    [setSearchTerm]
  )

  return (
    <View style={styles.screen}>
      <OrderItemListSearchSection
        navigateTo={navigation.navigate}
        onSearch={_handleOnSearch}
      />
      <OrderItemListListSection
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

export default OrderItemListScreen
