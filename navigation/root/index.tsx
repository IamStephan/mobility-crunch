import React from "react"
import { StyleSheet } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
//@ts-ignore
import Icon from "@expo/vector-icons/MaterialIcons"

import { NavContainers } from "../../constants/screens"
import InventoryNavigator from "../inventory"
import OrdersNavigator from "../orders"
import SettingsNavigator from "../settings"

const RootTabNavigator = createBottomTabNavigator()

interface TabOptionsI {
  tabBarLabel: string
  tabBarIcon: (props: {
    focused: boolean
    color: string
    size: number
  }) => React.ReactNode
}

const TabOptions = (label: string, icon: string): TabOptionsI => {
  const TabIcon: TabOptionsI["tabBarIcon"] = ({ color, size }) => (
    <Icon name={icon} color={color} size={size} />
  )

  return {
    tabBarLabel: label,
    tabBarIcon: TabIcon,
  }
}

const InventoryTabOptions = TabOptions("Inventory", "inventory")
const OrdersTabOptions = TabOptions("Orders", "assignment")
const SettingsTabOptions = TabOptions("Settings", "settings")

const RootNavigator = () => {
  return (
    <RootTabNavigator.Navigator
      initialRouteName={NavContainers.orderItemContainer}
      tabBarOptions={{
        style: styles.header,
      }}
    >
      <RootTabNavigator.Screen
        name={NavContainers.inventoryItemContainer}
        options={InventoryTabOptions}
        component={InventoryNavigator}
      />
      <RootTabNavigator.Screen
        name={NavContainers.orderItemContainer}
        options={OrdersTabOptions}
        component={OrdersNavigator}
      />
      <RootTabNavigator.Screen
        name={NavContainers.settingsContainer}
        options={SettingsTabOptions}
        component={SettingsNavigator}
      />
    </RootTabNavigator.Navigator>
  )
}

const styles = StyleSheet.create({
  header: {
    elevation: 0,
  },
})

export default RootNavigator
