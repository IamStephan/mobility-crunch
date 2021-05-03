import React, { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import Form from "../../components/form"
import {
  OrderProductsData,
  useOrderProductMutations,
} from "../../database_hooks"

interface FormValues {
  productName: string
  productPrice: string
  productQuantity: string
}

const formSchema = yup.object().shape({
  productName: yup.string().required("Name is required"),
  productPrice: yup
    .number()
    .min(0, "Price cannot be less than R0")
    .required("Price is required")
    .typeError("Price is required"),
  productQuantity: yup
    .number()
    .min(1, "Quantity cannot be less than 1")
    .required("Quantity is required")
    .typeError("Quantity is required"),
})

interface Props {
  data?: OrderProductsData
  goBack: () => void
}

// Form Sections do not need live data
const OrderItemEditProductFormSection: React.FC<Props> = ({ data, goBack }) => {
  const [loading, setLoading] = useState(false)

  const { editProduct } = useOrderProductMutations()

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      productName: data?.product_name,
      productPrice: data?.price,
      productQuantity: data?.quantity,
    },
  })

  const _handleEditOrderProduct = useCallback(async (formData: FormValues) => {
    if (data?.id) {
      await editProduct(data?.id, {
        product_name: formData.productName,
        price: `${formData.productPrice}`,
        quantity: `${formData.productQuantity}`,
      })
    }
  }, [])

  const _onSubmit = async (data: FormValues) => {
    setLoading(true)

    await _handleEditOrderProduct(data)
    goBack()

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
        <Form.Input
          control={control as any}
          name="productQuantity"
          label="Quantity"
          keyboardType="number-pad"
          isRequired
        />

        <Form.Submit
          title="Save Product"
          loading={loading}
          onSubmit={handleSubmit(_onSubmit)}
        />
      </Form.Section>
    </Form>
  )
}

export default OrderItemEditProductFormSection
