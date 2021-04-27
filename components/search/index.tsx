import React, { useCallback, useState } from "react"
import { View, StyleSheet } from "react-native"
import { Searchbar, IconButton } from "react-native-paper"
import useDebounce from "react-use/lib/useDebounce"

import Layout from "../../constants/layout"
import noop from "../../utils/noop"

interface Props {
  onSearch?: (text: string) => void
  placeholder?: string
  iconName?: string
  iconAction?: () => void
}

const DebouncingTime = 250

const Seachbox: React.FC<Props> = ({
  onSearch = noop,
  placeholder,
  iconName,
  iconAction = noop,
}) => {
  const [search, setSearch] = useState("")

  const _handleSearchText = useCallback(
    (text: string) => {
      setSearch(text)
    },
    [setSearch]
  )

  /**
   * increased typing speed may put unneeded
   * load on the JS thread when handling text changes
   */
  useDebounce(
    () => {
      onSearch(search)
    },
    DebouncingTime,
    [search]
  )

  const _handleClearText = useCallback(() => setSearch(""), [setSearch])

  return (
    <View style={styles.container}>
      <View style={styles.underlay} />
      <Searchbar
        onChangeText={_handleSearchText}
        value={search}
        style={styles.search}
        onIconPress={_handleClearText}
        placeholder={placeholder}
      />

      {!!iconName && (
        <IconButton icon={iconName} color="green" onPress={iconAction} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Layout.spacing,
    flexDirection: "row",
  },
  search: {
    flex: 1,
    marginRight: Layout.spacing,
    elevation: 0,
    borderRadius: 999,
    borderWidth: 0.5,
    borderColor: "rgb(199, 199, 204)",
  },
  underlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
  },
})

export default Seachbox
