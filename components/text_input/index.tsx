import React from "react"
import {
  View,
  TextInput as TextInputRN,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  ViewStyle,
  KeyboardTypeOptions,
  TextInputProps,
} from "react-native"

import { Border, Spacing, TypographyFamily, TypographySizes } from "../../theme"

interface Props {
  value?: string
  placeholder?: string
  onChangeText?: (text: string) => void
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
  isRounded?: boolean
  keyboardType?: KeyboardTypeOptions
  autoCapitalize?: TextInputProps["autoCapitalize"]
  numberOfLines?: number
  multiline?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

const TextInput: React.FC<Props> = ({
  value,
  placeholder,
  onChangeText,
  onBlur,
  isRounded,
  keyboardType = "default",
  autoCapitalize = "sentences",
  numberOfLines,
  multiline,
  prefix,
  suffix,
}) => {
  const InputContainerComputedStyles: ViewStyle = {
    borderRadius: isRounded ? 999 : Border.radius,
  }

  return (
    <View style={[styles.container, InputContainerComputedStyles]}>
      {!!prefix && (
        <View style={[styles.iconContainer, styles.iconContainerPrefix]}>
          {prefix}
        </View>
      )}
      <TextInputRN
        style={styles.input}
        onBlur={onBlur}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
        multiline={multiline}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        numberOfLines={numberOfLines}
      />
      {!!suffix && (
        <View style={[styles.iconContainer, styles.iconContainerSuffix]}>
          {suffix}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: Border.width,
    borderColor: Border.color,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    flexDirection: "row",
  },
  iconContainer: {
    justifyContent: "center",
    alignContent: "center",
  },
  iconContainerPrefix: {
    marginRight: Spacing.lg,
  },
  iconContainerSuffix: {
    marginLeft: Spacing.lg,
  },
  input: {
    flex: 1,
    fontFamily: TypographyFamily.regular,
    fontSize: TypographySizes.md,
  },
})

export default TextInput
