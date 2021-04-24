import React from "react"
import { ScrollView } from "react-native"

import { useSettingsData } from "../../database_hooks"
import SettingsDocumentNumbers from "../../sections/settings_document_numbers"
import SettingsList from "../../sections/settings_list"

const SettingsScreen = () => {
  const { state, data } = useSettingsData()

  return (
    <ScrollView>
      <SettingsDocumentNumbers
        loading={state.loading}
        quote={data?.current_quote_num}
        forma={data?.current_forma_num}
        invoice={data?.current_invoice_num}
      />
      <SettingsList vatValue={data?.vat} loading={state.loading} />
    </ScrollView>
  )
}

export default SettingsScreen
