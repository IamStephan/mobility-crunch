import React from "react"

import Section from "../../components/section"
import ListField, { ListFieldLoader } from "../../components/list_field"
import LoadingSwitch from "../../components/loading_switch"

interface Props {
  vat?: number
  debug?: boolean
  loading?: boolean
}

const SettingsViewGeneralSection: React.FC<Props> = ({
  loading,
  vat,
  debug,
}) => {
  return (
    <Section heading="General information" iconName="info-outline">
      <LoadingSwitch
        loading={loading}
        loadedComponent={
          <ListField label="Vat percentage" value={vat ? `${vat}%` : ""} />
        }
        loadingComponent={
          <ListFieldLoader label="Vat percentage" placeholderValue="15%" />
        }
      />

      <LoadingSwitch
        loading={loading}
        loadedComponent={
          <ListField label="Debug mode" value={debug ? "On" : "off"} />
        }
        loadingComponent={
          <ListFieldLoader label="Debug mode" placeholderValue="Off" />
        }
      />

      <LoadingSwitch
        loading={loading}
        loadedComponent={<ListField label="App version" value={"v2.0.0"} />}
        loadingComponent={
          <ListFieldLoader label="App version" placeholderValue="v2.0.0" />
        }
      />
    </Section>
  )
}

export default SettingsViewGeneralSection
