import React, { useCallback, useState } from "react"
import { View, StyleSheet } from "react-native"
import useDebounce from "react-use/lib/useDebounce"

import TextInput from "../../components/text_input"
import Icon, { Props as IconProps } from "../../components/icon"
import noop from "../../utils/noop"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Green, TypographySizes, Spacing } from "../../theme"

interface Props {
  onSearch?: (text: string) => void
  placeholder?: string
  iconName?: string
  iconVariant?: IconProps["variant"]
  iconAction?: () => void
}

const DebouncingTime = 250

const Seachbox: React.FC<Props> = ({
  onSearch = noop,
  placeholder,
  iconName,
  iconVariant,
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

  const ClearIconButton = () => {
    return (
      <TouchableOpacity onPress={_handleClearText}>
        <Icon name="clear" />
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          isRounded
          onChangeText={_handleSearchText}
          value={search}
          placeholder={placeholder}
          prefix={<Icon name="search" variant="material" />}
          suffix={search ? <ClearIconButton /> : null}
        />
      </View>

      {!!iconName && (
        <View style={styles.actionWrapper}>
          <TouchableOpacity onPress={iconAction}>
            <View style={styles.actionContainer}>
              <Icon
                name={iconName}
                variant={iconVariant}
                color="white"
                size={TypographySizes.lg}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
    flexDirection: "row",
    alignSelf: "center",
  },
  search: {
    flex: 1,
  },
  actionWrapper: {
    alignSelf: "center",
  },
  actionContainer: {
    backgroundColor: Green.green500,
    alignSelf: "center",
    borderRadius: 999,
    padding: Spacing.md,
    marginLeft: Spacing.lg,
  },
})

export default Seachbox
