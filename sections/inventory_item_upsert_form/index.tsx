import React, { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import Form from "../../components/form"
import { ProductsData, useProductMutations } from "../../database_hooks"

interface FormValues {
  productName: string
  productPrice: string
}

const formSchema = yup.object().shape({
  productName: yup.string().required("Name is required"),
  productPrice: yup
    .number()
    .min(0, "Price cannot be less than R0")
    .required("Price is required")
    .typeError("Price is required"),
})

interface Props {
  type: "insert" | "edit"
  data?: ProductsData
  goBack: () => void
}

// Form Sections do not need live data
const InventoryItemUpsertFormSection: React.FC<Props> = ({
  type,
  data,
  goBack,
}) => {
  const [loading, setLoading] = useState(false)

  const { insertProduct, editProduct } = useProductMutations()

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      productName: data?.name,
      productPrice: data?.price ? `${data.price}` : "",
    },
  })

  const _handleInsertProduct = useCallback(async (formData: FormValues) => {
    await insertProduct({
      name: formData.productName,
      price: Number(formData.productPrice),
    })
  }, [])

  const _handleEditProduct = useCallback(async (formData: FormValues) => {
    if (data?.id) {
      await editProduct(data?.id, {
        name: formData.productName,
        price: Number(formData.productPrice),
      })
    }
  }, [])

  const _onSubmit = async (data: FormValues) => {
    setLoading(true)

    switch (type) {
      case "edit": {
        await _handleEditProduct(data)
        goBack()
        break
      }
      case "insert": {
        await _handleInsertProduct(data)
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
        heading="General Information"
        iconName="info"
        indentChildrenWithIcon={false}
      >
        <Form.Input
          control={control as any}
          name="productName"
          label="Name"
          isRequired
        />
        <Form.Input
          control={control as any}
          name="productPrice"
          label="Price"
          keyboardType="number-pad"
          isRequired
        />

        <Form.Submit
          title={type === "insert" ? "Add Product" : "Save Product"}
          loading={loading}
          onSubmit={handleSubmit(_onSubmit)}
        />
      </Form.Section>
    </Form>
  )
}

export default InventoryItemUpsertFormSection
