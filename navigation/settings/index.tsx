import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

// Constants
import { NavScreens } from "../../constants/screens"

// Dummy
import Dummy from "../../components/dummy_view"

const StackNav = createStackNavigator()

const SettingsNavigator = () => {
  return (
    <StackNav.Navigator initialRouteName={NavScreens.settingsList}>
      <StackNav.Screen name={NavScreens.settingsList} component={Dummy} />
    </StackNav.Navigator>
  )
}

export default SettingsNavigator
