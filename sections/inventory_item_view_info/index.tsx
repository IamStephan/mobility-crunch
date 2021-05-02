import React from "react"

import Section from "../../components/section"
import ListField, { ListFieldLoader } from "../../components/list_field"
import LoadingSwitch from "../../components/loading_switch"
import { ZAR } from "../../utils/formatNumber"

interface Props {
  productName?: string
  productPrice?: number
  loading?: boolean
}

const InventoryItemViewInfo: React.FC<Props> = ({
  loading,
  productName,
  productPrice,
}) => {
  return (
    <Section heading="General information" iconName="info-outline">
      <LoadingSwitch
        loading={loading}
        loadedComponent={
          <ListField label="Name" value={productName ? productName : ""} />
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
        loadedComponent={
          <ListField
            label="Price"
            value={ZAR(productPrice ? productPrice : 0)}
          />
        }
        loadingComponent={
          <ListFieldLoader label="Price" placeholderValue="R5 000" />
        }
      />
    </Section>
  )
}

export default InventoryItemViewInfo
