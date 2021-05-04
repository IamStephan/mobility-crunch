import React from "react"
import { Control, Controller } from "react-hook-form"
import {
  View,
  StyleSheet,
  KeyboardTypeOptions,
  TextInputProps,
} from "react-native"

import { Spacing, Red, Border } from "../../theme"
import TextInput from "../text_input"
import { Label } from "../text"

interface Props {
  label: string
  name: string
  control: Control
  keyboardType?: KeyboardTypeOptions
  autoCapitalize?: TextInputProps["autoCapitalize"]
  numberOfLines?: number
  multiline?: boolean
  placeholder?: string
  isRequired?: boolean
  suffix?: React.ReactNode
  prefix?: React.ReactNode
}

const FormTextInput: React.FC<Props> = ({
  label,
  control,
  name,
  keyboardType,
  autoCapitalize = "sentences",
  numberOfLines,
  multiline,
  placeholder,
  isRequired,
  suffix,
  prefix,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={styles.container}>
          <Label style={styles.titleLabel}>
            {label}{" "}
            {isRequired && <Label style={styles.requiredLabel}>*</Label>}
          </Label>
          <TextInput
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            prefix={prefix}
            suffix={suffix}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            numberOfLines={numberOfLines}
            multiline={multiline}
          />
          {!!error?.message && (
            <Label style={styles.errorLabel}>{error.message}</Label>
          )}
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  titleLabel: {
    marginBottom: Border.radius,
    marginLeft: Border.radius,
  },
  requiredLabel: {
    color: Red.red600,
    opacity: 1,
  },
  errorLabel: {
    marginTop: Border.radius,
    marginLeft: Border.radius,
    color: Red.red600,
    opacity: 1,
  },
})

export default FormTextInput
