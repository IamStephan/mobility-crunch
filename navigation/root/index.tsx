import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

//@ts-ignore
import Icon from "@expo/vector-icons/MaterialIcons"

// Constants
import { NavContainers } from "../../constants/screens"

// Container
import InventoryNavigator from "../inventory"
import OrdersNavigator from "../orders"
import SettingsNavigator from "../settings"

const RootTabNavigator = createBottomTabNavigator()

const RootNavigator = () => {
  return (
    <RootTabNavigator.Navigator
      initialRouteName={NavContainers.orderItemContainer}
      tabBarOptions={{
        style: {
          elevation: 0,
        },
      }}
    >
      <RootTabNavigator.Screen
        name={NavContainers.inventoryItemContainer}
        options={{
          tabBarLabel: "Inventory",
          tabBarIcon: ({ color, size }) => (
            <Icon name="inventory" color={color} size={size} />
          ),
        }}
        component={InventoryNavigator}
      />
      <RootTabNavigator.Screen
        name={NavContainers.orderItemContainer}
        options={{
          tabBarLabel: "Orders",
          tabBarIcon: ({ color, size }) => (
            <Icon name="assignment" color={color} size={size} />
          ),
        }}
        component={OrdersNavigator}
      />
      <RootTabNavigator.Screen
        name={NavContainers.settingsContainer}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings" color={color} size={size} />
          ),
        }}
        component={SettingsNavigator}
      />
    </RootTabNavigator.Navigator>
  )
}

export default RootNavigator
