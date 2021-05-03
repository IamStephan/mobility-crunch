import React from "react"
import { StyleSheet } from "react-native"
import {
  createStackNavigator,
  StackNavigationOptions,
  HeaderTitle,
  StackHeaderTitleProps,
} from "@react-navigation/stack"
import { useRoute } from "@react-navigation/native"

import { NavScreens } from "../../constants/screens"
import OrderItemListScreen from "../../screens/order_item_list"
import OrderItemViewScreen from "../../screens/order_item_view"
import OrderItemAddProductListScreen from "../../screens/order_item_add_product_list"
import OrderItemUpsertScreen from "../../screens/order_item_upsert"

// Dummy
import Dummy from "../../components/dummy_view"

const StackNav = createStackNavigator()

const ItemUpsertHeaderTitle: React.FC<StackHeaderTitleProps> = ({
  tintColor,
}) => {
  const { params } = useRoute()
  if (params) {
    return <HeaderTitle style={{ color: tintColor }}>Edit Order</HeaderTitle>
  }

  return <HeaderTitle style={{ color: tintColor }}>New Order</HeaderTitle>
}

const ItemListOptions: StackNavigationOptions = {
  headerTitle: "Order",
}

const OrderItemUpsertOptions: StackNavigationOptions = {
  headerTitle: ItemUpsertHeaderTitle,
}

const OrderItemViewOptions: StackNavigationOptions = {
  headerTitle: "Order overview",
}

const OrderItemAddProductListOptions: StackNavigationOptions = {
  headerTitle: "Add products",
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
      <StackNav.Screen name={NavScreens.orderItemViewAs} component={Dummy} />
      <StackNav.Screen
        name={NavScreens.orderItemAddProductList}
        options={OrderItemAddProductListOptions}
        component={OrderItemAddProductListScreen}
      />
      <StackNav.Screen
        name={NavScreens.orderItemEditProduct}
        component={Dummy}
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
