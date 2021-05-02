import React, { useCallback, useState } from "react"
import { FlatList, View, StyleSheet, LayoutChangeEvent } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"

import {
  useOrderData,
  OrdersData,
  useOrderProductsData,
  OrderProductsData,
} from "../../database_hooks"

import OrderItemViewInfoSection from "../../sections/order_item_view_info"
import OrderItemViewActionsSection from "../../sections/order_item_view_actions"
import OrderItemViewProductsHeader from "../../sections/order_item_view_products_header"

import { Spacing } from "../../theme"
import ListItem, { ListItemLoader } from "../../components/list_item"
import { NavScreens } from "../../constants/screens"
import { ZAR } from "../../utils/formatNumber"

interface Props extends StackScreenProps<any> {}

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

const OrderItemViewScreen: React.FC<Props> = ({ navigation, route }) => {
  const [itemProbingHeight, setItemProbingHeight] = useState(1)

  const params = route.params as OrdersData

  const { data: dataOrder, state: stateOrder } = useOrderData(params.id)
  const {
    data: dataOrderProducts,
    state: stateOrderProducts,
  } = useOrderProductsData(params.id)

  const _getItemLayoutHeight = useCallback(
    (_, index) => ({
      length: itemProbingHeight,
      offset: itemProbingHeight * index,
      index,
    }),
    [itemProbingHeight]
  )

  const _handleItemNavigation = useCallback((product) => {
    navigation.navigate(NavScreens.inventoryItemView, product)
  }, [])

  const _RenderHeader = () => {
    return (
      <>
        <OrderItemViewInfoSection
          loading={stateOrder.loading}
          clientName={dataOrder?.client_name}
          clientEmail={dataOrder?.email}
          phone={dataOrder?.phone}
          businessName={dataOrder?.business_name}
          secondEmail={dataOrder?.second_email}
          vatNumber={dataOrder?.vat_number}
          road={dataOrder?.road}
          city={dataOrder?.city}
          province={dataOrder?.province}
        />

        <OrderItemViewActionsSection
          loading={stateOrder.loading || stateOrderProducts.loading}
          navigateTo={navigation.navigate}
        />

        <OrderItemViewProductsHeader />
      </>
    )
  }

  const _RenderItem: React.FC<{
    item: OrderProductsData
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
      <View style={styles.container} onLayout={_handleSettingProbingHeight}>
        <ListItem
          key={item.id}
          title={item.product_name}
          captions={[ZAR(Number(item.price)), `Quantiy: ${item.quantity}`]}
          onPress={() => _handleItemNavigation(item)}
          iconName="delete"
          iconVariant="material"
          onIconPress={() => {}}
        />
      </View>
    )
  }, [])

  /**
   * Render a loader placeholder or render an error
   * screen if there seems to have been an error
   */
  const _RenderEmptyList: React.FC = useCallback(() => {
    if (stateOrderProducts.loading) {
      return (
        <View style={styles.container}>
          {Array(2)
            .fill(1)
            .map((_, index) => (
              <ListItemLoader
                key={index}
                title="Some loong aas title asd asdasd asd as dasd"
                captions={["R600.00", "Quantity: 1"]}
                hasIcon
              />
            ))}
        </View>
      )
    }

    // TODO: create empty list not found comp
    return null
  }, [stateOrderProducts.loading])

  return (
    <FlatList
      ListHeaderComponent={_RenderHeader}
      renderItem={_RenderItem}
      ListEmptyComponent={_RenderEmptyList}
      data={dataOrderProducts}
      windowSize={WindowSize}
      getItemLayout={_getItemLayoutHeight}
      maxToRenderPerBatch={MaxRenderBatch}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.xl,
  },
})

export default OrderItemViewScreen
