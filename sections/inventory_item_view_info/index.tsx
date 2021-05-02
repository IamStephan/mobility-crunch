import React from "react"

import Section from "../../components/section"
import ListField, { ListFieldLoader } from "../../components/list_field"
import LoadingSwitch from "../../components/loading_switch"

interface Props {
  loading?: boolean
}

const InventoryItemViewInfo: React.FC<Props> = ({ loading }) => {
  return (
    <Section heading="General information" iconName="info-outline">
      <LoadingSwitch
        loading={loading}
        loadedComponent={
          <ListField label="Name" value="Some weird ass wheelchair" />
        }
        loadingComponent={
          <ListFieldLoader
            label="Name"
            placeholderValue="Some weird ass wheelchair"
          />
        }
      />

      <LoadingSwitch
        loading={loading}
        loadedComponent={<ListField label="Price" value="R5 000" />}
        loadingComponent={
          <ListFieldLoader label="Price" placeholderValue="R5 000" />
        }
      />
    </Section>
  )
}

export default InventoryItemViewInfo
