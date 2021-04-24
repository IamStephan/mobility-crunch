import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import { NavScreens } from "../../constants/screens"
import SettingsScreen from "../../screens/settings"

const StackNav = createStackNavigator()

const SettingsNavigator = () => {
  return (
    <StackNav.Navigator
      initialRouteName={NavScreens.settingsList}
      screenOptions={{
        headerStyle: {
          elevation: 0,
        },
      }}
    >
      <StackNav.Screen
        name={NavScreens.settingsList}
        options={{
          headerTitle: "Settings",
        }}
        component={SettingsScreen}
      />
    </StackNav.Navigator>
  )
}

export default SettingsNavigator
