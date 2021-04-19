import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { View } from "react-native"

// Constants
import { NavScreens } from "../../constants/screens"

// Dummy
import Dummy from "../../components/dummy_view"

const StackNav = createStackNavigator()

const InventoryNavigator = () => {
  return (
    <StackNav.Navigator initialRouteName={NavScreens.inventoryItemList}>
      <StackNav.Screen name={NavScreens.inventoryItemList} component={Dummy} />
      <StackNav.Screen name={NavScreens.inventoryItemView} component={Dummy} />
      <StackNav.Screen
        name={NavScreens.inventoryItemUpsert}
        component={Dummy}
      />
    </StackNav.Navigator>
  )
}

export default InventoryNavigator
