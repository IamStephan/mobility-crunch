import React from "react"
import { StyleSheet } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"

import { NavScreens } from "../../constants/screens"

// Dummy
import Dummy from "../../components/dummy_view"

const StackNav = createStackNavigator()

const ItemListOptions = {
  headerTitle: "Inventory",
}

const InventoryNavigator = () => {
  return (
    <StackNav.Navigator
      initialRouteName={NavScreens.inventoryItemList}
      screenOptions={{
        headerStyle: styles.header,
      }}
    >
      <StackNav.Screen
        name={NavScreens.inventoryItemList}
        options={ItemListOptions}
        component={Dummy}
      />
      <StackNav.Screen name={NavScreens.inventoryItemView} component={Dummy} />
      <StackNav.Screen
        name={NavScreens.inventoryItemUpsert}
        component={Dummy}
      />
    </StackNav.Navigator>
  )
}

const styles = StyleSheet.create({
  header: {
    elevation: 0,
  },
})

export default InventoryNavigator
