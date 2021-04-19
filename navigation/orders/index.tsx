import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

// Constants
import { NavContainers, NavScreens } from "../../constants/screens"

// Containers
import OrderItemNavigator from "../order_item"

// Dummy
import Dummy from "../../components/dummy_view"

const StackNav = createStackNavigator()

const OrdersNavigator = () => {
  return (
    <StackNav.Navigator initialRouteName={NavScreens.orderItemList}>
      <StackNav.Screen name={NavScreens.orderItemList} component={Dummy} />
      <StackNav.Screen
        name={NavContainers.orderItemViewContainer}
        component={OrderItemNavigator}
      />
      <StackNav.Screen name={NavScreens.orderItemUpsert} component={Dummy} />
    </StackNav.Navigator>
  )
}

export default OrdersNavigator
