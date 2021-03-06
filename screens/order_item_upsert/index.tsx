import React from "react"
import { ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"

import { OrdersData } from "../../database_hooks"

import OrderItemUpsertFormSection from "../../sections/order_item_upsert_form"

interface Props extends StackScreenProps<any> {}

const OrderItemUpsertScreen: React.FC<Props> = ({ navigation, route }) => {
  const params = route?.params as OrdersData

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "height" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <OrderItemUpsertFormSection
          type={params?.id ? "edit" : "insert"}
          data={params}
          goBack={navigation.goBack}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default OrderItemUpsertScreen
