import React, { useRef, useCallback } from "react"
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

interface Props {
  loading?: boolean
  navigateTo: (name: string, params?: any) => void
}

const OrderItemViewActionSection: React.FC<Props> = ({
  loading,
  navigateTo,
}) => {
  const viewAsModalRef = useRef<ViewAsModalRef>(null)
  const viewAsCopyTaxModalRef = useRef<ViewAsCopyTaxModalRef>(null)

  const _handleViewAsPress = useCallback(() => {
    viewAsModalRef.current?.openModal()
  }, [])

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
            style={styles.buttonSpacing}
            action={_handleViewAsPress}
          />
          <Basic
            title="Copy tax"
            style={styles.buttonSpacing}
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
    justifyContent: "center",
    marginBottom: Spacing.lg,
  },
  buttonSpacing: {
    marginHorizontal: Spacing.md,
  },
})

export default OrderItemViewActionSection
