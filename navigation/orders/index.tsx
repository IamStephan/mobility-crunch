import React from "react"
import { StyleSheet } from "react-native"
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack"

import { NavScreens } from "../../constants/screens"
import OrderItemListScreen from "../../screens/order_item_list"
import OrderItemViewScreen from "../../screens/order_item_view"

// Dummy
import Dummy from "../../components/dummy_view"

const StackNav = createStackNavigator()

const ItemListOptions: StackNavigationOptions = {
  headerTitle: "Order",
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

      {/**
       * ORDER ITEMS SCREENS
       */}
      <StackNav.Screen
        name={NavScreens.orderItemView}
        component={OrderItemViewScreen}
        options={{
          title: "Order overview",
        }}
      />
      <StackNav.Screen name={NavScreens.orderItemUpsert} component={Dummy} />
      <StackNav.Screen name={NavScreens.orderItemViewAs} component={Dummy} />
      <StackNav.Screen
        name={NavScreens.orderItemEditProductList}
        component={Dummy}
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
