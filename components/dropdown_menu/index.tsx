import React from "react"
import { View, StyleSheet } from "react-native"

import { Title } from "../text"
import { Spacing, Gray } from "../../theme"

import DropdownOption from "./menu_option"

interface DropdownComponents {
  Option: typeof DropdownOption
}

interface Props {
  title?: string
}

const DropdownMenu: React.FC<Props> & DropdownComponents = ({
  children,
  title,
}) => {
  return (
    <View>
      {!!title && (
        <View>
          <View style={styles.titleContainer}>
            <Title style={styles.title}>{title}</Title>
          </View>

          <View style={styles.divider} />
        </View>
      )}
      {children}
    </View>
  )
}

DropdownMenu.Option = DropdownOption

const styles = StyleSheet.create({
  titleContainer: {
    marginHorizontal: Spacing["2xl"],
    paddingVertical: Spacing.md,
    opacity: 0.5,
  },
  title: {
    textAlign: "center",
  },
  divider: { height: 0.5, backgroundColor: Gray.gray200 },
})

export default DropdownMenu
