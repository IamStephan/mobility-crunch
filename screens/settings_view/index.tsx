import React, { useEffect } from "react"
import { ScrollView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"

import { useSettingsData } from "../../database_hooks"
import SettingsViewDocumentsSection from "../../sections/settings_view_documents"
import SettingsViewGeneralSection from "../../sections/settings_view_general"

const SettingsViewScreen: React.FC<StackScreenProps<{}>> = ({ navigation }) => {
  const { state, data } = useSettingsData()

  useEffect(() => {
    if (!state.loading && !state.error) {
      navigation.setParams(data as any)
    }
  }, [state.loading, state.error, data?.vat])

  return (
    <ScrollView>
      <SettingsViewDocumentsSection
        loading={state.loading}
        quote={data?.current_quote_num}
        forma={data?.current_forma_num}
        invoice={data?.current_invoice_num}
      />
      <SettingsViewGeneralSection
        loading={state.loading}
        vat={data?.vat}
        debug={data?.debug}
      />
    </ScrollView>
  )
}

export default SettingsViewScreen
