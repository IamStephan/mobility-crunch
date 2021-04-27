import React, { useCallback, useState } from "react"
import { View, StyleSheet } from "react-native"
import { Title } from "react-native-paper"

import ListField, { ListFieldLoader } from "../../components/list_field"
import LoadingSwitch from "../../components/loading_switch"
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
      <LoadingSwitch
        loading={loading}
        loadedComponent={
          <ListField
            label="Vat Percentage"
            value={`${vatValue}%`}
            iconName="circle-edit-outline"
            action={_openEditVatModal}
          />
        }
        loadingComponent={
          <ListFieldLoader
            hasIcon
            label="Vat Percentage"
            placeholderValue="15%"
          />
        }
      />

      <LoadingSwitch
        loading={loading}
        loadedComponent={
          <ListField label="Debug Mode" value={debugMode ? "On" : "Off"} />
        }
        loadingComponent={
          <ListFieldLoader label="Debug Mode" placeholderValue="Off" />
        }
      />

      <LoadingSwitch
        loading={loading}
        loadedComponent={<ListField label="App Version" value={"v2.0.0"} />}
        loadingComponent={
          <ListFieldLoader label="App Version" placeholderValue="v2.0.0" />
        }
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
