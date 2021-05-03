import React, { useState, useCallback } from "react"
import { View, StyleSheet } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"

import {
  useProductsData,
  ProductsData,
  OrderProductsData,
  useOrderProductsMutations,
} from "../../database_hooks"
import OrderItemAddProductListSearchSection from "../../sections/order_item_add_product_list_search"
import OrderItemAddProductListListSection from "../../sections/order_item_add_product_list_list"

const OrderItemAddProductListScreen: React.FC<StackScreenProps<{}>> = ({
  navigation,
  route,
}) => {
  const params = route.params as { excludeIDs: Array<string>; orderID: string }

  const [searchTerm, setSearchTerm] = useState("")
  const [loadingAction, setLoadingAction] = useState(false)

  const [selected, setSelected] = useState<
    Map<string, Omit<OrderProductsData, "id">>
  >(new Map())

  const { data = [], state } = useProductsData(searchTerm, {
    excludeIDs: params.excludeIDs,
  })

  const { insertOrderProducts } = useOrderProductsMutations()

  // Handle search term changes
  const _handleOnSearch = useCallback(
    (text: string) => {
      setSearchTerm(text)
    },
    [setSearchTerm]
  )

  const _handleItemToggle = useCallback(
    (product: ProductsData) => {
      if (selected.has(product.id)) {
        setSelected((prev) => {
          const newSelected = new Map(prev)
          newSelected.delete(product.id)
          return newSelected
        })
      } else {
        setSelected((prev) =>
          new Map(prev).set(product.id, {
            order_id: params.orderID,
            product_id: product.id,
            product_name: product.name,
            price: `${product.price}`,
            quantity: "1",
          })
        )
      }
    },
    [selected]
  )

  const _handleAddSave = useCallback(async () => {
    setLoadingAction(true)

    const selectedArray = [...selected.values()]
    await insertOrderProducts(selectedArray)
    navigation.goBack()

    setLoadingAction(false)
  }, [selected])

  return (
    <View style={styles.screen}>
      <OrderItemAddProductListSearchSection
        onSave={_handleAddSave}
        onSearch={_handleOnSearch}
        loadingAction={loadingAction}
      />
      <OrderItemAddProductListListSection
        selected={selected}
        products={data}
        onToggle={_handleItemToggle}
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

export default OrderItemAddProductListScreen
