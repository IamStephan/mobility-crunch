import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import { NavScreens } from "../../constants/screens"
import OrderItemListScreen from "../../screens/order_item_list"

// Dummy
import Dummy from "../../components/dummy_view"

const StackNav = createStackNavigator()

const OrdersNavigator = () => {
  return (
    <StackNav.Navigator
      initialRouteName={NavScreens.orderItemList}
      screenOptions={{
        headerStyle: {
          elevation: 0,
        },
      }}
    >
      <StackNav.Screen
        name={NavScreens.orderItemList}
        options={{ headerTitle: "Orders" }}
        component={OrderItemListScreen}
      />

      {/**
       * ORDER ITEMS SCREENS
       */}
      <StackNav.Screen name={NavScreens.orderItemUpsert} component={Dummy} />
      <StackNav.Screen name={NavScreens.orderItemView} component={Dummy} />
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

export default OrdersNavigator
