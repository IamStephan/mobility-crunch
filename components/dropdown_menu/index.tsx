import React from "react"
import { View, StyleSheet } from "react-native"

import DropdownOption from "./menu_option"

interface DropdownComponents {
  Option: typeof DropdownOption
}

interface Props {
  title?: string
}

const DropdownMenu: React.FC<Props> & DropdownComponents = ({ children }) => {
  return <View style={styles.container}>{children}</View>
}

DropdownMenu.Option = DropdownOption

const styles = StyleSheet.create({
  container: {},
})

export default DropdownMenu
