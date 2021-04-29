import React from "react"
import { Control, Controller } from "react-hook-form"
import { Input, Text, Div } from "react-native-magnus"

interface Props {
  label: string
  name: string
  control: Control
  isOptional?: boolean
  description?: string
  suffix?: React.ReactNode
  prefix?: React.ReactNode
}

const FormTextInput: React.FC<Props> = ({
  label,
  control,
  name,
  isOptional,
  description,
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
        <Div mb="lg">
          <Text mb="xs" color="gray900">
            {label} {isOptional && <Text color="gray500">(optional)</Text>}
          </Text>
          <Input
            focusBorderColor="green600"
            color="gray900"
            py="sm"
            px="lg"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            prefix={prefix}
            suffix={suffix}
          />
          {!!error?.message ? (
            <Text color="red500" mt="xs">
              {error.message}
            </Text>
          ) : description ? (
            <Text color="gray500" mt="xs">
              {description}
            </Text>
          ) : null}
        </Div>
      )}
    />
  )
}

export default FormTextInput
