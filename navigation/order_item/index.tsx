import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

// Constants
import { NavScreens } from "../../constants/screens"

// Dummy
import Dummy from "../../components/dummy_view"

const StackNav = createStackNavigator()

const OrderItemViewNavigator = () => {
  return (
    <StackNav.Navigator initialRouteName={NavScreens.orderItemList}>
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

export default OrderItemViewNavigator
