import React, { useCallback } from "react"
import { View, StyleSheet } from "react-native"

import Searchbox from "../../components/search"
import { Spacing } from "../../theme"

interface Props {
  onSearch: (text: string) => void
  onSave: () => void
  loadingAction?: boolean
}

const OrderItemEditProductListSearchSection: React.FC<Props> = ({
  onSearch,
  onSave,
  loadingAction,
}) => {
  const _handleAction = useCallback(() => {
    onSave()
  }, [onSave])

  return (
    <View style={styles.container}>
      <Searchbox
        onSearch={onSearch}
        iconName="save"
        placeholder="Product name..."
        iconAction={_handleAction}
        iconLoading={loadingAction}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
  },
})

export default OrderItemEditProductListSearchSection
