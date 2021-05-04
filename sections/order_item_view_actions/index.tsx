import React, { useRef, useCallback, useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"

import Section from "../../components/section"
import { Primary, Basic } from "../../components/button"

import OrderViewAsModal, {
  RefFunctions as ViewAsModalRef,
} from "../../modal_components/order_view_as"
import OrderViewAsCopyTaxModal, {
  RefFunctions as ViewAsCopyTaxModalRef,
} from "../../modal_components/order_view_as_copy_tax"

import { Spacing } from "../../theme"
import {
  OrderProductsData,
  OrdersData,
  SettingsData,
  useSettingsData,
} from "../../database_hooks"

interface Props {
  loading?: boolean
  orderDetails?: OrdersData
  products?: Array<OrderProductsData>
  settingsDetails?: SettingsData
  navigateTo: (name: string, params?: any) => void
}

const OrderItemViewActionSection: React.FC<Props> = ({
  loading,
  orderDetails,
  products,
  settingsDetails,
  navigateTo,
}) => {
  const viewAsModalRef = useRef<ViewAsModalRef>(null)
  const viewAsCopyTaxModalRef = useRef<ViewAsCopyTaxModalRef>(null)
  const { data, state } = useSettingsData()

  const _handleViewAsPress = useCallback(() => {
    if (orderDetails && products && data) {
      viewAsModalRef.current?.openModal(orderDetails, products, data)
    }
  }, [orderDetails, products, data])

  const _handleViewAsCopyTaxPress = useCallback(() => {
    viewAsCopyTaxModalRef.current?.openModal()
  }, [])

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
          <Basic
            title="Copy tax"
            loading={state.loading || loading}
            action={_handleViewAsCopyTaxPress}
          />
        </View>
      </Section>

      <OrderViewAsModal ref={viewAsModalRef} navigateTo={navigateTo} />
      <OrderViewAsCopyTaxModal
        ref={viewAsCopyTaxModalRef}
        navigateTo={navigateTo}
      />
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
