import React, { useRef, useCallback } from "react"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import {
  createStackNavigator,
  StackNavigationOptions,
  HeaderTitle,
  StackHeaderTitleProps,
  TransitionPresets,
} from "@react-navigation/stack"
import { useRoute, useNavigation } from "@react-navigation/native"

import { NavScreens } from "../../constants/screens"
import OrderItemMoreModal, {
  RefFunctions as ModalRef,
} from "../../modal_components/order_item_list_more"
import Icon from "../../components/icon"
import { OrdersData } from "../../database_hooks"

import OrderItemListScreen from "../../screens/order_item_list"
import OrderItemViewScreen from "../../screens/order_item_view"
import OrderItemAddProductListScreen from "../../screens/order_item_add_product_list"
import OrderItemUpsertScreen from "../../screens/order_item_upsert"
import OrderItemEditProductScreen from "../../screens/order_item_edit_product"
import OrderViewAsScreen from "../../screens/order_item_view_as"

const StackNav = createStackNavigator()

const NormalScreenTransition = TransitionPresets.SlideFromRightIOS
const FormScreenTransition = TransitionPresets.RevealFromBottomAndroid

const ItemUpsertHeaderTitle: React.FC<StackHeaderTitleProps> = ({
  tintColor,
}) => {
  const { params } = useRoute()
  if (params) {
    return <HeaderTitle style={{ color: tintColor }}>Edit Order</HeaderTitle>
  }

  return <HeaderTitle style={{ color: tintColor }}>New Order</HeaderTitle>
}

const ItemViewHeaderRight: React.FC<{
  tintColor?: string | undefined
}> = ({ tintColor }) => {
  const { params } = useRoute()
  const { navigate, goBack } = useNavigation()
  const modalRef = useRef<ModalRef>(null)

  const _handleOpenModal = useCallback(() => {
    if (modalRef.current?.openModal) {
      modalRef.current.openModal(params as OrdersData)
    }
  }, [])

  if (!params) return null

  return (
    <>
      <TouchableOpacity onPress={_handleOpenModal}>
        <View style={styles.headerIcon}>
          <Icon color={tintColor} name="more-vert" size={23} />
        </View>
      </TouchableOpacity>

      <OrderItemMoreModal
        ref={modalRef}
        navigateTo={navigate}
        goBack={goBack}
      />
    </>
  )
}

const ItemListOptions: StackNavigationOptions = {
  headerTitle: "Order",
  ...NormalScreenTransition,
}

const OrderItemUpsertOptions: StackNavigationOptions = {
  headerTitle: ItemUpsertHeaderTitle,
  ...FormScreenTransition,
}

const OrderItemViewOptions: StackNavigationOptions = {
  headerTitle: "Order overview",
  headerRight: ItemViewHeaderRight,
  ...NormalScreenTransition,
}

const OrderItemViewAsOptions: StackNavigationOptions = {
  headerTitle: "Order document",
  ...NormalScreenTransition,
}

const OrderItemAddProductListOptions: StackNavigationOptions = {
  headerTitle: "Add products",
  ...FormScreenTransition,
}

const OrderItemEditProductOptions: StackNavigationOptions = {
  headerTitle: "Edit order product",
  ...FormScreenTransition,
}

const OrdersNavigator = () => {
  return (
    <StackNav.Navigator
      initialRouteName={NavScreens.orderItemList}
      screenOptions={{
        headerStyle: styles.header,
        headerTitleAlign: "center",
      }}
    >
      <StackNav.Screen
        name={NavScreens.orderItemList}
        options={ItemListOptions}
        component={OrderItemListScreen}
      />
      <StackNav.Screen
        name={NavScreens.orderItemUpsert}
        options={OrderItemUpsertOptions}
        component={OrderItemUpsertScreen}
      />

      {/**
       * ORDER ITEMS SCREENS
       */}
      <StackNav.Screen
        name={NavScreens.orderItemView}
        options={OrderItemViewOptions}
        component={OrderItemViewScreen}
      />
      <StackNav.Screen
        name={NavScreens.orderItemViewAs}
        options={OrderItemViewAsOptions}
        component={OrderViewAsScreen}
      />
      <StackNav.Screen
        name={NavScreens.orderItemAddProductList}
        options={OrderItemAddProductListOptions}
        component={OrderItemAddProductListScreen}
      />
      <StackNav.Screen
        name={NavScreens.orderItemEditProduct}
        options={OrderItemEditProductOptions}
        component={OrderItemEditProductScreen}
      />
    </StackNav.Navigator>
  )
}

const styles = StyleSheet.create({
  header: {
    elevation: 0,
  },
  headerIcon: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 5,
  },
})

export default OrdersNavigator
