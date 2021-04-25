import React, { useCallback, useState } from "react"
import { View, StyleSheet } from "react-native"
import { Title } from "react-native-paper"

import ListField from "../../components/list_field"
import EditVatPercentageModal from "../../modal_components/edit_vat_percentage"
import Layout from "../../constants/layout"

interface Props {
  loading?: boolean
  debugMode?: boolean
  vatValue?: number
}

const SettingsList: React.FC<Props> = ({ loading, debugMode, vatValue }) => {
  const [isEditVatOpen, setIsEditVatOpen] = useState(false)

  const _openEditVatModal = useCallback(() => setIsEditVatOpen(true), [])
  const _onCloseEloseEditVatModalRequest = useCallback(
    () => setIsEditVatOpen(false),
    []
  )

  return (
    <View style={styles.container}>
      <Title style={styles.title}>General Settings</Title>
      <ListField
        label="Vat Percentage"
        value={`${vatValue}%`}
        placeholderValue="15%"
        iconName="circle-edit-outline"
        loading={loading}
        action={_openEditVatModal}
      />
      <ListField
        label="Debug Mode"
        value={debugMode ? "On" : "Off"}
        placeholderValue="Off"
        loading={loading}
      />
      <ListField
        label="App Version"
        value={"v2.0.0"}
        placeholderValue="v2.0.0"
        loading={loading}
      />

      <EditVatPercentageModal
        isOpen={isEditVatOpen}
        trueVat={`${vatValue}`}
        onCloseRequest={_onCloseEloseEditVatModalRequest}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.spacing * 2,
  },
  title: {
    paddingBottom: Layout.spacing,
  },
})

export default SettingsList
