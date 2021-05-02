import React from "react"
import { StyleSheet, Text } from "react-native"
import {
  createStackNavigator,
  StackNavigationOptions,
  HeaderTitle,
} from "@react-navigation/stack"
import { useRoute } from "@react-navigation/native"

import { NavScreens } from "../../constants/screens"
import InventoryItemListScreen from "../../screens/inventory_item_list"
import InventoryItemViewScreen from "../../screens/inventory_item_view"
import InventoryItemUpsertScreen from "../../screens/inventory_item_upsert"

const StackNav = createStackNavigator()

const ItemListOptions: StackNavigationOptions = {
  headerTitle: "Inventory",
}

const ItemViewOptions: StackNavigationOptions = {
  headerTitle: "Product",
}

const ItemUpsertOptions: StackNavigationOptions = {
  headerTitle: ({ tintColor }) => {
    const { params } = useRoute()

    if (params) {
      return (
        <HeaderTitle style={{ color: tintColor }}>Edit Product</HeaderTitle>
      )
    }

    return <HeaderTitle style={{ color: tintColor }}>New Product</HeaderTitle>
  },
}

const InventoryNavigator = () => {
  return (
    <StackNav.Navigator
      initialRouteName={NavScreens.inventoryItemList}
      screenOptions={{
        headerStyle: styles.header,
        headerTitleAlign: "center",
      }}
    >
      <StackNav.Screen
        name={NavScreens.inventoryItemList}
        options={ItemListOptions}
        component={InventoryItemListScreen}
      />
      <StackNav.Screen
        name={NavScreens.inventoryItemView}
        options={ItemViewOptions}
        component={InventoryItemViewScreen}
      />
      <StackNav.Screen
        name={NavScreens.inventoryItemUpsert}
        options={ItemUpsertOptions}
        component={InventoryItemUpsertScreen}
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
