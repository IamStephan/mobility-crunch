import React from "react"

import ListField, { ListFieldLoader } from "../../components/list_field"
import Section from "../../components/section"
import LoadingSwitch from "../../components/loading_switch"

interface Props {
  loading?: boolean
  clientName: string
  clientEmail: string
  businessName?: string
  secondEmail?: string
  vatNumber?: string

  // address
  road?: string
  city?: string
  province?: string
}

const ParseDate = (road?: string, city?: string, province?: string) => {
  let Address = ""

  if (!road && !city && !province) return "-----"

  if (road) Address += road + "\u000A"
  if (city) Address += city + "\u000A"
  if (province) Address += province + ", South Africa"

  return Address
}

const OrderItemViewInfoSection: React.FC<Partial<Props>> = ({
  loading,
  clientEmail,
  clientName,
  businessName,
  secondEmail,
  vatNumber,
  road,
  city,
  province,
}) => {
  return (
    <Section
      heading="General information"
      iconName="info"
      indentChildrenWithIcon={false}
    >
      <LoadingSwitch
        loading={loading}
        loadedComponent={
          <ListField label="Client name" value={clientName ? clientName : ""} />
        }
        loadingComponent={
          <ListFieldLoader
            label="Client name"
            placeholderValue="Stephan Burger"
          />
        }
      />

      <LoadingSwitch
        loading={loading}
        loadedComponent={
          <ListField
            label="Primary email"
            value={clientEmail ? clientEmail : ""}
          />
        }
        loadingComponent={
          <ListFieldLoader
            label="Primary email"
            placeholderValue="stephan@frompeople.co.za"
          />
        }
      />

      <LoadingSwitch
        loading={loading}
        loadedComponent={
          <ListField
            label="Business name"
            value={businessName ? businessName : "-----"}
          />
        }
        loadingComponent={
          <ListFieldLoader
            label="Business name"
            placeholderValue="From people"
          />
        }
      />

      <LoadingSwitch
        loading={loading}
        loadedComponent={
          <ListField
            label="Secondary email"
            value={secondEmail ? secondEmail : "-----"}
          />
        }
        loadingComponent={
          <ListFieldLoader
            label="Secondary email"
            placeholderValue="hello@frompeople.co.za"
          />
        }
      />

      <LoadingSwitch
        loading={loading}
        loadedComponent={
          <ListField
            label="Vat number"
            value={vatNumber ? vatNumber : "-----"}
          />
        }
        loadingComponent={
          <ListFieldLoader label="Vat number" placeholderValue="60466046424" />
        }
      />

      <LoadingSwitch
        loading={loading}
        loadedComponent={
          <ListField label="Address" value={ParseDate(road, city, province)} />
        }
        loadingComponent={
          <ListFieldLoader label="Address" placeholderValue={"Small address"} />
        }
      />
    </Section>
  )
}

export default OrderItemViewInfoSection
