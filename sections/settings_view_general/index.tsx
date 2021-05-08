import React from "react"

import Section from "../../components/section"
import ListField, { ListFieldLoader } from "../../components/list_field"
import LoadingSwitch from "../../components/loading_switch"

interface Props {
  vat?: number
  debug?: boolean
  loading?: boolean
}

const AppVersion = "v2.0.1a"

const SettingsViewGeneralSection: React.FC<Props> = ({
  loading,
  vat,
  debug,
}) => {
  return (
    <Section heading="General information" iconName="info">
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
        loadedComponent={<ListField label="App version" value={AppVersion} />}
        loadingComponent={
          <ListFieldLoader label="App version" placeholderValue={AppVersion} />
        }
      />
    </Section>
  )
}

export default SettingsViewGeneralSection
