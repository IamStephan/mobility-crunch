import React, { useCallback, useState } from "react"
import { FlatList, View, StyleSheet, LayoutChangeEvent } from "react-native"

import { Spacing } from "../../theme"
import { NavScreens } from "../../constants/screens"
import { ZAR } from "../../utils/formatNumber"
import ListItem, { ListItemLoader } from "../../components/list_item"
import { ProductsData } from "../../database_hooks"

interface Props {
  data: Array<ProductsData>
  loading: boolean
  navigateTo: (name: string, params?: any) => void
}

/**
 * This handles how many batches to render at a time
 * based on the device screen size
 *
 * The default value is 21 and makes no sense. Why
 * would you need to render that many items at a time,
 * it just blocks the JS thread and eats ram. The need for
 * not having blank scroll states just seems trivial
 */
const WindowSize = 5
const MaxRenderBatch = 5

const InventoryItemListListSection: React.FC<Props> = ({
  data,
  navigateTo,
  loading,
}) => {
  const [itemProbingHeight, setItemProbingHeight] = useState(1)

  const _getItemLayoutHeight = useCallback(
    (_, index) => ({
      length: itemProbingHeight,
      offset: itemProbingHeight * index,
      index,
    }),
    [itemProbingHeight]
  )

  const _handleItemNavigation = useCallback(() => {
    navigateTo(NavScreens.inventoryItemView)
  }, [])

  /**
   * The item to render
   */
  const RenderItem: React.FC<{
    item: ProductsData
    index: number
  }> = useCallback(({ item, index }) => {
    const _handleSettingProbingHeight = (e: LayoutChangeEvent) => {
      const {
        nativeEvent: {
          layout: { height },
        },
      } = e

      if (index === 0) {
        setItemProbingHeight(height)
      }
    }

    return (
      <View onLayout={_handleSettingProbingHeight}>
        <ListItem
          key={item.id}
          title={item.name}
          captions={[ZAR(item.price)]}
          onPress={_handleItemNavigation}
          iconName="more-vert"
          iconVariant="material"
        />
      </View>
    )
  }, [])

  /**
   * Render a loader placeholder or render an error
   * screen if there seems to have been an error
   */
  const RenderEmptyList: React.FC = useCallback(() => {
    if (loading) {
      return (
        <View>
          {Array(10)
            .fill(1)
            .map((_, index) => (
              <ListItemLoader
                key={index}
                title="Some loong aas title asd asdasd asd as dasd"
                captions={["R600.00"]}
                hasIcon
              />
            ))}
        </View>
      )
    }

    // TODO: create empty list not found comp
    return null
  }, [loading])

  return (
    <FlatList
      getItemLayout={_getItemLayoutHeight}
      maxToRenderPerBatch={MaxRenderBatch}
      data={data}
      style={styles.container}
      renderItem={RenderItem}
      windowSize={WindowSize}
      ListEmptyComponent={RenderEmptyList}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.xl,
  },
})

export default InventoryItemListListSection
