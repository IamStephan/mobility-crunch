import React from "react"
import { ScrollView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"

import InventoryItemUpsertFormSection from "../../sections/inventory_item_upsert_form"

interface Props extends StackScreenProps<any> {}

const InventoryItemUpsertScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView>
      <InventoryItemUpsertFormSection />
    </ScrollView>
  )
}

export default InventoryItemUpsertScreen
