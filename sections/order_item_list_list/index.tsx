import React, { useCallback, useState, useRef } from "react"
import { FlatList, LayoutChangeEvent, StyleSheet, View } from "react-native"

import { Spacing } from "../../theme"
import { NavScreens } from "../../constants/screens"
import { OrdersData } from "../../database_hooks"
import DetailedListItem, { ListItemLoader } from "../../components/list_item"
import OrderItemListMoreModal, {
  RefFunctions as ModalRef,
} from "../../modal_components/order_item_list_more"

interface Props {
  data: Array<OrdersData>
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

const OrderItemListListSection: React.FC<Props> = ({
  data,
  navigateTo,
  loading,
}) => {
  const [itemProbingHeight, setItemProbingHeight] = useState(1)

  const modalRef = useRef<ModalRef>(null)

  const _getItemLayoutHeight = useCallback(
    (_, index) => ({
      length: itemProbingHeight,
      offset: itemProbingHeight * index,
      index,
    }),
    [itemProbingHeight]
  )

  const _handleItemNavigation = useCallback((params) => {
    navigateTo(NavScreens.orderItemView, params)
  }, [])

  /**
   * The item to render
   */
  const RenderItem: React.FC<{
    item: OrdersData
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
        <DetailedListItem
          key={item.id}
          title={item.client_name}
          captions={[
            item.business_name ? item.business_name : "--------",
            item.email,
          ]}
          iconName="more-vert"
          iconVariant="material"
          onPress={() => _handleItemNavigation(item)}
          onIconPress={() => {
            modalRef.current?.openModal(item)
          }}
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
                captions={["Stephan Burger", "stephanBurger54@gmail.com"]}
                hasIcon
              />
            ))}
        </View>
      )
    }

    return null
  }, [])

  return (
    <>
      <FlatList
        getItemLayout={_getItemLayoutHeight}
        maxToRenderPerBatch={MaxRenderBatch}
        data={data}
        style={styles.list}
        renderItem={RenderItem}
        windowSize={WindowSize}
        ListEmptyComponent={RenderEmptyList}
      />

      <OrderItemListMoreModal ref={modalRef} navigateTo={navigateTo} />
    </>
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
})

export default OrderItemListListSection
