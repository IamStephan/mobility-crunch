import React from "react"
import { View, StyleSheet } from "react-native"

import { TypographySizes } from "../../theme"
import Section from "../../components/section"
import LoadingText from "../../components/loading_text"
import ListField, { ListFieldLoader } from "../../components/list_field"
import LoadingSwitch from "../../components/loading_switch"

const LoadingStat: React.FC = () => {
  return (
    <LoadingText
      text="20069"
      Component={Text as any}
      style={styles.statLoading}
      alignText="center"
    />
  )
}

interface Props {
  loading?: boolean
  quote?: number
  forma?: number
  invoice?: number
}

const SettingsViewDocumentsSection: React.FC<Props> = ({
  loading,
  quote,
  forma,
  invoice,
}) => {
  return (
    <Section
      heading="Current document numbers"
      iconName="file-document-outline"
      iconVariant="materialCommunity"
    >
      <LoadingSwitch
        loading={loading}
        loadedComponent={
          <ListField label="Quote" value={quote ? `${quote}` : ""} />
        }
        loadingComponent={
          <ListFieldLoader label="Quote" placeholderValue="20069" />
        }
      />

      <LoadingSwitch
        loading={loading}
        loadedComponent={
          <ListField label="Pro forma" value={forma ? `${forma}` : ""} />
        }
        loadingComponent={
          <ListFieldLoader label="Pro forma" placeholderValue="20069" />
        }
      />

      <LoadingSwitch
        loading={loading}
        loadedComponent={
          <ListField label="Invoice" value={invoice ? `${invoice}` : ""} />
        }
        loadingComponent={
          <ListFieldLoader label="Invoice" placeholderValue="20069" />
        }
      />
    </Section>
  )
}

const styles = StyleSheet.create({
  statLoading: {
    fontSize: TypographySizes["xl"],
  },
})

export default SettingsViewDocumentsSection
