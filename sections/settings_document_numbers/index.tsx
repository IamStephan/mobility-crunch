import React from "react"
import { StyleSheet } from "react-native"
import { Div, Text } from "react-native-magnus"

import LoadingSwitch from "../../components/loading_switch"
import LoadingText from "../../components/loading_text"
import { Typography } from "../../constants/typography"

interface Props {
  loading?: boolean
  quote?: number
  forma?: number
  invoice?: number
}

const LoadingStat: React.FC = () => {
  return (
    <LoadingText
      text="20069"
      Component={Text as any}
      style={{
        fontSize: Typography["3xl"],
      }}
      alignText="center"
    />
  )
}

const SettingsDocumentNumbers: React.FC<Props> = ({
  loading,
  quote,
  forma,
  invoice,
}) => {
  return (
    <Div p="lg" mb="xl">
      <Text mb="lg" fontWeight="500" fontSize="3xl" color="gray900">
        Current Numbers
      </Text>
      <Div row justifyContent="center">
        <Div alignItems="center" flex={1}>
          <Text textAlign="center" color="gray600">
            Quote
          </Text>
          <LoadingSwitch
            loading={loading}
            loadingComponent={<LoadingStat />}
            loadedComponent={
              <Text color="green700" fontWeight="bold" fontSize="3xl">
                {quote}
              </Text>
            }
          />
        </Div>

        <Div alignItems="center" flex={1}>
          <Text textAlign="center" color="gray600">
            Pro Forma
          </Text>
          <LoadingSwitch
            loading={loading}
            loadingComponent={<LoadingStat />}
            loadedComponent={
              <Text color="green700" fontWeight="bold" fontSize="3xl">
                {forma}
              </Text>
            }
          />
        </Div>

        <Div alignItems="center" flex={1}>
          <Text textAlign="center" color="gray600">
            Invoice
          </Text>
          <LoadingSwitch
            loading={loading}
            loadingComponent={<LoadingStat />}
            loadedComponent={
              <Text color="green700" fontWeight="bold" fontSize="3xl">
                {invoice}
              </Text>
            }
          />
        </Div>
      </Div>
    </Div>
  )
}

export default SettingsDocumentNumbers
