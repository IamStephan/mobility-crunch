import React from "react"
import { StyleSheet } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"

import { NavScreens } from "../../constants/screens"
import SettingsScreen from "../../screens/settings"

const StackNav = createStackNavigator()

const SettingsOption = {
  headerTitle: "Settings",
}

const SettingsNavigator = () => {
  return (
    <StackNav.Navigator
      initialRouteName={NavScreens.settingsList}
      screenOptions={{
        headerStyle: styles.header,
      }}
    >
      <StackNav.Screen
        name={NavScreens.settingsList}
        options={SettingsOption}
        component={SettingsScreen}
      />
    </StackNav.Navigator>
  )
}

const styles = StyleSheet.create({
  header: {
    elevation: 0,
  },
})

export default SettingsNavigator
