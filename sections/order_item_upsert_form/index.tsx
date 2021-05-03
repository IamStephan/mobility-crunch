import React, { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import Form from "../../components/form"
import { OrdersData, useOrderMutations } from "../../database_hooks"

interface FormValues {
  clientName: string
  primaryEmail: string
  phone: string
  businessName: string
  secondaryEmail: string
  vatNumber: string
  road: string
  city: string
  province: string
}

const formSchema = yup.object().shape({
  clientName: yup.string().required("Client name is required"),
  primaryEmail: yup
    .string()
    .email("Please provide a valid email address")
    .required("Primary email is required"),
  phone: yup.string().trim().ensure(),
  businessName: yup.string().trim().ensure(),
  secondaryEmail: yup
    .string()
    .email("Please provide a valid email address")
    .ensure(),
  vatNumber: yup.string().trim().ensure(),
  road: yup.string().trim().ensure(),
  city: yup.string().trim().ensure(),
  province: yup.string().trim().ensure(),
})

interface Props {
  type: "insert" | "edit"
  data?: OrdersData
  goBack: () => void
}

// Form Sections do not need live data
const OrderItemUpsertFormSection: React.FC<Props> = ({
  type,
  data,
  goBack,
}) => {
  const [loading, setLoading] = useState(false)

  const { insertOrder, editOrder } = useOrderMutations()

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      clientName: data?.client_name,
      primaryEmail: data?.email,
      phone: data?.phone,
      businessName: data?.business_name,
      secondaryEmail: data?.second_email,
      vatNumber: data?.vat_number,
      road: data?.road,
      city: data?.city,
      province: data?.province,
    },
  })

  const _handleInsertOrder = useCallback(
    async (formData: Omit<OrdersData, "id">) => {
      await insertOrder(formData)
    },
    []
  )

  const _handleEditOrder = useCallback(
    async (formData: Omit<OrdersData, "id">) => {
      if (data?.id) {
        await editOrder(data?.id, formData)
      }
    },
    []
  )

  const _onSubmit = async (data: FormValues) => {
    setLoading(true)

    const formDataTranslation: Omit<OrdersData, "id"> = {
      client_name: data.clientName,
      email: data.primaryEmail,
      phone: data.phone,
      business_name: data.businessName,
      second_email: data.secondaryEmail,
      vat_number: data.vatNumber,
      road: data.road,
      city: data.city,
      province: data.province,

      // Useless
      state: "pending",
    }

    switch (type) {
      case "edit": {
        await _handleEditOrder(formDataTranslation)
        goBack()
        break
      }
      case "insert": {
        await _handleInsertOrder(formDataTranslation)
        goBack()
        break
      }

      default: {
        console.log("fuck")
        break
      }
    }

    setLoading(false)
  }

  return (
    <Form>
      <Form.Section
        heading="General information"
        iconName="info"
        indentChildrenWithIcon={false}
      >
        <Form.Input
          control={control as any}
          name="clientName"
          label="Client name"
          isRequired
        />
        <Form.Input
          control={control as any}
          name="primaryEmail"
          label="Primary email"
          keyboardType="email-address"
          autoCapitalize="none"
          isRequired
        />
        <Form.Input
          control={control as any}
          name="phone"
          label="Phone number"
        />
        <Form.Input
          control={control as any}
          name="businessName"
          label="Business name"
        />
        <Form.Input
          control={control as any}
          name="secondaryEmaill"
          keyboardType="email-address"
          autoCapitalize="none"
          label="Secondary email"
        />
        <Form.Input
          control={control as any}
          name="vatNumber"
          label="Vat number"
          keyboardType="number-pad"
        />
      </Form.Section>

      <Form.Section
        heading="Order address"
        iconName="local-shipping"
        iconVariant="material"
        indentChildrenWithIcon={false}
      >
        <Form.Input control={control as any} name="road" label="Road" />
        <Form.Input
          control={control as any}
          name="city"
          label="City | Suburb"
        />
        <Form.Input control={control as any} name="province" label="Province" />

        <Form.Submit
          title={type === "insert" ? "Add Order" : "Save Order"}
          loading={loading}
          onSubmit={handleSubmit(_onSubmit)}
        />
      </Form.Section>
    </Form>
  )
}

export default OrderItemUpsertFormSection
