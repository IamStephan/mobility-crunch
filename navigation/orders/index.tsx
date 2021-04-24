import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Appbar } from "react-native-paper"

import { NavContainers, NavScreens } from "../../constants/screens"
import OrderItemNavigator from "../order_item"

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
        component={Dummy}
      />
      <StackNav.Screen
        name={NavContainers.orderItemViewContainer}
        component={OrderItemNavigator}
      />
      <StackNav.Screen name={NavScreens.orderItemUpsert} component={Dummy} />
    </StackNav.Navigator>
  )
}

export default OrdersNavigator
