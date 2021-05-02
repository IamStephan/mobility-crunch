import React, { useCallback } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import Form from "../../components/form"
import Button from "../../components/button"

const formSchema = yup.object().shape({
  productName: yup.string().required("Name is required"),
  productPrice: yup
    .number()
    .min(0, "Price cannot be less than R0")
    .required("Price is required")
    .typeError("Price is required"),
})

const InventoryItemUpsertFormSection = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(formSchema),
  })

  const _onSubmit = useCallback((data) => {
    console.log(data)
  }, [])

  return (
    <Form>
      <Form.Section
        heading="General Information"
        iconName="info"
        indentChildrenWithIcon={false}
        showDivider={false}
      >
        <Form.Input
          control={control}
          name="productName"
          label="Name"
          isRequired
        />
        <Form.Input
          control={control}
          name="productPrice"
          label="Price"
          keyboardType="number-pad"
          isRequired
        />

        <Form.Submit
          title="Add Product"
          loading={false}
          onSubmit={handleSubmit(_onSubmit)}
        />
      </Form.Section>
    </Form>
  )
}

export default InventoryItemUpsertFormSection
