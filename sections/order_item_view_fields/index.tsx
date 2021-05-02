import React from "react"
import { View, StyleSheet, SectionListRenderItem } from "react-native"

import { OrdersData } from "../../database_hooks"
import Layout from "../../constants/layout"
import ListField from "../../components/list_field"

interface Props {}

const ParseDate = (road?: string, city?: string, province?: string) => {
  let Address = ""

  if (!road && !city && !province) return "-"

  if (road) Address += road + "\u000A"
  if (city) Address += city + "\u000A"
  if (province) Address += province + ", South Africa"

  return Address
}

const OrderItemViewFieldsSection: SectionListRenderItem<OrdersData> = ({
  item,
}) => {
  return (
    <View style={styles.container} key="asd">
      <ListField label="Client name" value={item.client_name} />
      <ListField label="Business name" value={item.business_name || "-"} />
      <ListField label="Email" value={item.email} />
      <ListField label="Secondary email" value={item.second_email || "-"} />
      <ListField label="Vat number" value={item.vat_number || "-"} />
      <ListField
        label="Address"
        value={ParseDate(item.road, item.city, item.province)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.spacing * 2,
  },
})

export default OrderItemViewFieldsSection
