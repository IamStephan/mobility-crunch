import React from "react"
import { ScrollView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"

import { SettingsData } from "../../database_hooks"

import SettingsEditFormSection from "../../sections/settings_edit_form"

interface Props extends StackScreenProps<any> {}

const SettinsEditScreen: React.FC<Props> = ({ navigation, route }) => {
  const params = route?.params as SettingsData

  return (
    <ScrollView>
      <SettingsEditFormSection data={params} goBack={navigation.goBack} />
    </ScrollView>
  )
}

export default SettinsEditScreen
