import React, { useCallback } from "react"
import { View, StyleSheet } from "react-native"

import Searchbox from "../../components/search"
import { NavScreens } from "../../constants/screens"
import { Spacing } from "../../theme"

interface Props {
  onSearch: (text: string) => void
  navigateTo: (name: string, params?: any) => void
}

const InventoryItemListSearchSection: React.FC<Props> = ({
  onSearch,
  navigateTo,
}) => {
  const _handleAction = useCallback(() => {
    navigateTo(NavScreens.orderItemUpsert)
  }, [])

  return (
    <View style={styles.container}>
      <Searchbox
        onSearch={onSearch}
        iconName="add"
        placeholder="Client or Business name..."
        iconAction={_handleAction}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
  },
})

export default InventoryItemListSearchSection
