import React from "react"
import { ScrollView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"

import { ProductsData } from "../../database_hooks"

import InventoryItemUpsertFormSection from "../../sections/inventory_item_upsert_form"

interface Props extends StackScreenProps<any> {}

const InventoryItemUpsertScreen: React.FC<Props> = ({ navigation, route }) => {
  const params = route?.params as ProductsData

  return (
    <ScrollView>
      <InventoryItemUpsertFormSection
        type={params?.id ? "edit" : "insert"}
        data={params}
        goBack={navigation.goBack}
      />
    </ScrollView>
  )
}

export default InventoryItemUpsertScreen
