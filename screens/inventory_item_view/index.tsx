import React from "react"
import { ScrollView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"

import InventoryItemViewInfo from "../../sections/inventory_item_view_info"

const InventoryIconViewSreen: React.FC<StackScreenProps<{}>> = () => {
  return (
    <ScrollView>
      <InventoryItemViewInfo />
    </ScrollView>
  )
}

export default InventoryIconViewSreen
