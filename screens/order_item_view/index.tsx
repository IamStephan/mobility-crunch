import React, { useCallback, useState, useRef } from "react"
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

import { Green, Red, Spacing } from "../../theme"
import ListItem, { ListItemLoader } from "../../components/list_item"
import { NavScreens } from "../../constants/screens"
import { ZAR } from "../../utils/formatNumber"
import { Primary, Basic } from "../../components/button"
import OrderViewRemoveOrderProducts, {
  RefFunctions as RemoveItemsModal,
} from "../../modal_components/order_view_remove_order_products"

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
  const [selectionActivated, setSelectionAvtivated] = useState(false)
  const [selected, setSelected] = useState<Map<string, boolean>>(new Map())

  const removeItemsModal = useRef<RemoveItemsModal>(null)

  const params = route.params as OrdersData

  const { data: dataOrder, state: stateOrder } = useOrderData(params.id)
  const {
    data: dataOrderProducts,
    meta: metaOrderProducts,
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

  const _handleItemNavigation = useCallback((item: OrderProductsData) => {
    navigation.navigate(NavScreens.orderItemEditProduct, item)
  }, [])

  const _handleAddItemsNavigation = useCallback(() => {
    navigation.navigate(NavScreens.orderItemAddProductList, {
      excludeIDs: metaOrderProducts?.productIDs,
      orderID: params.id,
    })
  }, [metaOrderProducts?.productIDs])

  const _handleSelctionActivation = useCallback(
    (orderID: string) => {
      if (!selectionActivated) {
        setSelectionAvtivated(true)
        _handleSelectionToggle(orderID)
      }
    },
    [selectionActivated]
  )

  const _handleSelectionToggle = useCallback(
    (orderItemID: string) => {
      if (selected.has(orderItemID)) {
        setSelected((prev) => {
          const newSelected = new Map(prev)
          newSelected.delete(orderItemID)

          if (!newSelected.size) {
            setSelectionAvtivated(false)
          }

          return newSelected
        })
      } else {
        setSelected((prev) => new Map(prev).set(orderItemID, true))
      }
    },
    [selected]
  )

  const _handleSelectionClear = useCallback(() => {
    setSelected(new Map())
    setSelectionAvtivated(false)
  }, [])

  const _handleItemDeleteRequest = useCallback((orderProductID: string) => {
    console.log(orderProductID)
    removeItemsModal.current?.openModal([orderProductID])
  }, [])

  const _handleItemSelectionDeleteRequest = useCallback(() => {
    removeItemsModal.current?.openModal([...selected.keys()])
  }, [selected])

  const _handleModalClose = useCallback(() => {
    setSelectionAvtivated(false)
    setSelected(new Map())
  }, [])

  const _RenderHeader: React.FC = () => {
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

      return (
        <View style={styles.container} onLayout={_handleSettingProbingHeight}>
          <ListItem
            key={item.id}
            title={item.product_name}
            captions={[ZAR(Number(item.price)), `Quantity: ${item.quantity}`]}
            onPress={
              selectionActivated
                ? () => _handleSelectionToggle(item.id)
                : () => _handleItemNavigation(item)
            }
            iconName={
              selectionActivated
                ? selected.has(item.id)
                  ? "check-circle"
                  : "radio-button-unchecked"
                : "delete"
            }
            iconVariant="material"
            iconColor={
              selectionActivated
                ? selected.has(item.id)
                  ? Green.green600
                  : undefined
                : undefined
            }
            onLongPress={() => _handleSelctionActivation(item.id)}
            onIconPress={
              selectionActivated
                ? () => _handleSelectionToggle(item.id)
                : () => _handleItemDeleteRequest(item.id)
            }
          />
        </View>
      )
    },
    [selectionActivated, selected, _handleSelctionActivation]
  )

  const _RenderFooter: React.FC = useCallback(() => {
    return (
      <View style={styles.footer}>
        {selectionActivated ? (
          <>
            <Basic title="Clear selection" action={_handleSelectionClear} />
            <Primary
              title="Remove Selection"
              action={_handleItemSelectionDeleteRequest}
              style={styles.footerRemoveButton}
            />
          </>
        ) : (
          <Primary title="Add Products" action={_handleAddItemsNavigation} />
        )}
      </View>
    )
  }, [metaOrderProducts?.productIDs, selectionActivated, selected])

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

    return null
  }, [stateOrderProducts.loading])

  return (
    <>
      <FlatList
        ListHeaderComponent={_RenderHeader}
        renderItem={_RenderItem}
        ListFooterComponent={_RenderFooter}
        ListEmptyComponent={_RenderEmptyList}
        data={dataOrderProducts}
        windowSize={WindowSize}
        getItemLayout={_getItemLayoutHeight}
        maxToRenderPerBatch={MaxRenderBatch}
      />
      <OrderViewRemoveOrderProducts
        onClose={_handleModalClose}
        ref={removeItemsModal}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.xl,
  },

  footer: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  footerRemoveButton: {
    backgroundColor: Red.red600,
  },
})

export default OrderItemViewScreen
