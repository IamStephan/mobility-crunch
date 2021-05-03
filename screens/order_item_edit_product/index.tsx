import React from "react"
import { ScrollView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"

import { OrderProductsData } from "../../database_hooks"

import OrderItemEditProductForm from "../../sections/order_item_edit_product_from"

interface Props extends StackScreenProps<any> {}

const OrderItemEditProductScreen: React.FC<Props> = ({ navigation, route }) => {
  const params = route?.params as OrderProductsData

  return (
    <ScrollView>
      <OrderItemEditProductForm data={params} goBack={navigation.goBack} />
    </ScrollView>
  )
}

export default OrderItemEditProductScreen
