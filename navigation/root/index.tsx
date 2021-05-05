import React from "react"
import { StyleSheet } from "react-native"
import {
  BottomTabBarOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs"

import { Green, Gray, Border } from "../../theme"
import { NavContainers } from "../../constants/screens"

import Icon from "../../components/icon"

import InventoryNavigator from "../inventory"
import OrdersNavigator from "../orders"
import SettingsNavigator from "../settings"

const RootTabNavigator = createBottomTabNavigator()

const styles = StyleSheet.create({
  tab: {
    elevation: 0,
    borderTopColor: Gray.gray200,
    borderTopWidth: Border.width,
  },
})

const DefaultTabBarOptions: BottomTabBarOptions = {
  style: styles.tab,
  keyboardHidesTabBar: true,
  activeTintColor: Green.green500,
  inactiveTintColor: Gray.gray500,
}

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
      tabBarOptions={DefaultTabBarOptions}
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

/**
 * NOTE to self:
 * ==============
 * do not unmount root routes on change.
 * Having to load and wait every time a route change
 * happens can be annoying
 */
export default RootNavigator
