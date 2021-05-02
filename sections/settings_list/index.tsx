import React, { useCallback, useState } from "react"
import { View, StyleSheet, Text } from "react-native"
import { Button } from "react-native-magnus"
import { Title } from "react-native-paper"

import ListField, { ListFieldLoader } from "../../components/list_field"
import LoadingSwitch from "../../components/loading_switch"
import Modal from "../../components/modal"
import Layout from "../../constants/layout"

import DropdownMenu from "../../components/dropdown_menu"
import { Red } from "../../theme"

interface Props {
  loading?: boolean
  debugMode?: boolean
  vatValue?: number
}

const SettingsList: React.FC<Props> = ({ loading, debugMode, vatValue }) => {
  const [isEditVatOpen, setIsEditVatOpen] = useState(false)
  const [showTop, setShopTop] = useState(false)

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
          <ListField label="Vat Percentage" value={`${vatValue}%`} />
        }
        loadingComponent={
          <ListFieldLoader label="Vat Percentage" placeholderValue="15%" />
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

      <Button onPress={_openEditVatModal}>Open Modal</Button>

      <Modal
        isOpen={isEditVatOpen}
        bottom={
          <DropdownMenu title="Product Options">
            <DropdownMenu.Option
              title="Edit item"
              iconSuffixName="delete"
              iconSuffixColor={Red.red500}
            />
          </DropdownMenu>
        }
        showBottom
        top={<Text>Top</Text>}
        showTop={showTop}
        onCloseRequest={_onCloseEloseEditVatModalRequest}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: Layout.spacing * 2,
  },
  title: {
    paddingBottom: Layout.spacing,
  },
})

export default SettingsList
