import React, { useCallback, useState } from "react"
import { View, StyleSheet } from "react-native"
import { Title } from "react-native-paper"

import ListItem from "../../components/list_item"
import EditVatPercentageModal from "../../modal_components/edit_vat_percentage"

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
      <ListItem
        label="Vat Percentage"
        value={`${vatValue}%`}
        placeholderValue="15%"
        iconName="circle-edit-outline"
        loading={loading}
        action={_openEditVatModal}
      />
      <ListItem
        label="Debug Mode"
        value={debugMode ? "On" : "Off"}
        placeholderValue="Off"
        loading={loading}
      />
      <ListItem
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
    paddingHorizontal: 20,
  },
  title: {
    paddingBottom: 10,
  },
})

export default SettingsList
