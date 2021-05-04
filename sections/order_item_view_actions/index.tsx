import React, { useRef, useCallback } from "react"
import { View, StyleSheet } from "react-native"

import Section from "../../components/section"
import { Basic } from "../../components/button"

import OrderViewAsModal, {
  RefFunctions as ViewAsModalRef,
} from "../../modal_components/order_view_as"

import { Spacing } from "../../theme"
import {
  OrderProductsData,
  OrdersData,
  useSettingsData,
} from "../../database_hooks"

interface Props {
  loading?: boolean
  orderDetails?: OrdersData
  products?: Array<OrderProductsData>
  navigateTo: (name: string, params?: any) => void
}

const OrderItemViewActionSection: React.FC<Props> = ({
  loading,
  orderDetails,
  products,
  navigateTo,
}) => {
  const viewAsModalRef = useRef<ViewAsModalRef>(null)
  const { data, state } = useSettingsData()

  const _handleViewAsPress = useCallback(() => {
    if (orderDetails && products && data) {
      viewAsModalRef.current?.openModal(orderDetails, products, data)
    }
  }, [orderDetails, products, data])

  return (
    <>
      <Section
        heading="Generate Documents"
        iconName="file-document"
        iconVariant="materialCommunity"
        indentChildrenWithIcon={false}
      >
        <View style={styles.primaryDocs}>
          <Basic
            title="Generate as"
            action={_handleViewAsPress}
            loading={state.loading || loading}
          />
        </View>
      </Section>

      <OrderViewAsModal ref={viewAsModalRef} navigateTo={navigateTo} />
    </>
  )
}

const styles = StyleSheet.create({
  primaryDocs: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: Spacing.lg,
  },
})

export default OrderItemViewActionSection
