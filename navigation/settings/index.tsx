import React, { useCallback } from "react"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack"
import { useNavigation, useRoute } from "@react-navigation/native"

import { NavScreens } from "../../constants/screens"
import Icon from "../../components/icon"
import Dummy from "../../components/dummy_view"

import SettingsViewScreen from "../../screens/settings_view"
import SettingsEditScreen from "../../screens/settings_edit"

const StackNav = createStackNavigator()

const ItemViewHeaderRight: React.FC<{
  tintColor?: string | undefined
}> = ({ tintColor }) => {
  const { navigate } = useNavigation()
  const { params }: any = useRoute()

  const _handleEditSettings = useCallback(() => {
    navigate(NavScreens.settingsEdit, params)
  }, [params?.vat])

  if (!params) return null

  return (
    <TouchableOpacity onPress={_handleEditSettings}>
      <View style={styles.headerIcon}>
        <Icon color={tintColor} name="edit" size={23} />
      </View>
    </TouchableOpacity>
  )
}

const SettingsViewOption: StackNavigationOptions = {
  headerTitle: "Settings",
  headerRight: ItemViewHeaderRight,
}

const SettingsEditOption: StackNavigationOptions = {
  headerTitle: "Edit Settings",
}

const SettingsNavigator = () => {
  return (
    <StackNav.Navigator
      initialRouteName={NavScreens.settingsView}
      screenOptions={{
        headerStyle: styles.header,
        headerTitleAlign: "center",
      }}
    >
      <StackNav.Screen
        name={NavScreens.settingsView}
        options={SettingsViewOption}
        component={SettingsViewScreen}
      />
      <StackNav.Screen
        name={NavScreens.settingsEdit}
        options={SettingsEditOption}
        component={SettingsEditScreen}
      />
    </StackNav.Navigator>
  )
}

const styles = StyleSheet.create({
  header: {
    elevation: 0,
  },
  headerIcon: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 5,
    marginRight: 5,
  },
})

export default SettingsNavigator
