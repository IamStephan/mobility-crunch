import React, { useCallback, useState } from "react"
import { FlatList, View, StyleSheet, LayoutChangeEvent } from "react-native"

import { Green, Spacing } from "../../theme"
import { ZAR } from "../../utils/formatNumber"
import ListItem, { ListItemLoader } from "../../components/list_item"
import { ProductsData, OrderProductsData } from "../../database_hooks"

interface Props {
  products: Array<ProductsData>
  selected: Map<string, Omit<OrderProductsData, "id">>
  loading: boolean
  onToggle: (product: ProductsData) => void
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

const OrderItemEditProductListListSection: React.FC<Props> = ({
  products,
  selected,
  loading,
  onToggle,
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

  const RenderItem: React.FC<{
    item: ProductsData
    index: number
  }> = useCallback(
    ({ item, index }) => {
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

      const _handleItemPress = () => onToggle(item)

      return (
        <View onLayout={_handleSettingProbingHeight}>
          <ListItem
            key={item.id}
            title={item.name}
            captions={[ZAR(item.price)]}
            onPress={_handleItemPress}
            onIconPress={_handleItemPress}
            iconName={
              selected.has(item.id) ? "check-circle" : "radio-button-unchecked"
            }
            iconColor={selected.has(item.id) ? Green.green600 : undefined}
          />
        </View>
      )
    },
    [selected]
  )

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

    return null
  }, [loading])

  return (
    <>
      <FlatList
        getItemLayout={_getItemLayoutHeight}
        maxToRenderPerBatch={MaxRenderBatch}
        data={products}
        style={styles.container}
        renderItem={RenderItem}
        windowSize={WindowSize}
        ListEmptyComponent={RenderEmptyList}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.xl,
  },
})

export default OrderItemEditProductListListSection
