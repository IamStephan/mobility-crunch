import React, { useCallback } from "react"
import { Div, Text } from "react-native-magnus"

interface Props {
  title?: string
  subtitle?: string
}

const FormSection: React.FC<Props> = ({ title, subtitle, children }) => {
  return (
    <Div mb="2xl">
      {(!!title || !!subtitle) && (
        <Div mb="lg">
          {!!title && (
            <Text color="gray900" fontSize="2xl" fontWeight="500">
              {title}
            </Text>
          )}

          {!!subtitle && <Text color="gray500">{subtitle}</Text>}
        </Div>
      )}

      {children}
    </Div>
  )
}

export default FormSection
