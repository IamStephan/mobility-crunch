import React from "react"
import { ScrollView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"

import { useProductData, ProductsData } from "../../database_hooks"
import InventoryItemViewInfo from "../../sections/inventory_item_view_info"

const InventoryIconViewSreen: React.FC<StackScreenProps<{}>> = ({
  navigation,
  route,
}) => {
  const product = route.params as ProductsData

  const { state, data } = useProductData(product.id)

  return (
    <ScrollView>
      <InventoryItemViewInfo
        loading={state.loading}
        productName={data?.name}
        productPrice={data?.price}
      />
    </ScrollView>
  )
}

export default InventoryIconViewSreen
