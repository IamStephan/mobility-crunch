import React, {
  useImperativeHandle,
  forwardRef,
  Ref,
  useState,
  useCallback,
} from "react"
import { Keyboard, View, StyleSheet } from "react-native"
import { ProgressBar } from "react-native-paper"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import Modal from "../../components/modal"
import Form from "../../components/form"
import Dropdown from "../../components/dropdown_menu"
import Chip from "../../components/chip"
import { Green, Spacing } from "../../theme"
import {
  OrdersData,
  OrderProductsData,
  SettingsData,
} from "../../database_hooks"
import { NavScreens } from "../../constants/screens"

import { useDocumentGeneration, DataPayload } from "../../functions_hooks"

interface CopyTaxDate {
  year: number
  month: number
  day: number
}

interface FormFields {
  reference: string
}

export interface RefFunctions {
  openModal: (
    orderDetails: OrdersData,
    products: Array<OrderProductsData>,
    settingsData: SettingsData
  ) => void
}

interface Props {
  navigateTo: (name: string, params?: any) => void
}

const formSchema = yup.object().shape({
  reference: yup.string().required("Reference is required"),
})

const formatDate = (date: Date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return day + "/" + month + "/" + year
}

const OrderItemViewAsModal = forwardRef(
  ({ navigateTo }: Props, ref: Ref<RefFunctions>) => {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isTopOpen, setIsTopOpen] = useState(false)
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [order, setOrder] = useState<OrdersData | null>(null)
    const [products, setProducts] = useState<Array<OrderProductsData>>([])
    const [settings, setSettings] = useState<SettingsData | null>(null)

    const { control, reset: resetForm, handleSubmit } = useForm<FormFields>({
      resolver: yupResolver(formSchema),
    })

    const { generateDocument } = useDocumentGeneration()

    const _handleOpenRequest = useCallback(
      (
        orderDetails: OrdersData,
        products: Array<OrderProductsData>,
        settingsData: SettingsData
      ) => {
        setOrder(orderDetails)
        setProducts(products)
        setSettings(settingsData)
        setIsOpen(true)
      },
      []
    )

    const _handleCloseRequest = useCallback(() => {
      if (!loading) {
        setIsOpen(false)
        _handleReset()
      }
    }, [loading])

    const _handleReset = useCallback(() => {
      setLoading(false)
      setIsTopOpen(false)
      setIsDatePickerOpen(false)
      setSelectedDate(null)
      setOrder(null)
      setProducts([])
      setSettings(null)
      resetForm()
    }, [])

    const _handleGeneration = useCallback(
      async (
        type: "quote" | "forma" | "invoice" | "copyTax",
        copyTaxDetails?: {
          reference: string
          dateToUse?: Date | null
        }
      ) => {
        let orderID: DataPayload["order_id"] = ""
        let payload: DataPayload = {} as DataPayload

        switch (type) {
          case "quote": {
            if (settings?.current_quote_num)
              orderID = `${settings.current_quote_num}`
            break
          }
          case "forma": {
            if (settings?.current_forma_num)
              orderID = `${settings.current_forma_num}`
            break
          }
          case "invoice": {
            if (settings?.current_invoice_num)
              orderID = `${settings.current_invoice_num}`
            break
          }
          case "copyTax": {
            if (order?.id) orderID = `${order.id}`
            if (copyTaxDetails?.reference)
              payload.copyTaxNum = copyTaxDetails.reference
            break
          }
        }

        let orderClient!: DataPayload["client"] & { dateToUse?: CopyTaxDate }

        if (order) {
          orderClient = {
            client_name: order.client_name,
            email: order.email,
          }
        }

        if (order?.phone) orderClient.phone = order.phone
        if (order?.vat_number) orderClient.vat_number = order.vat_number

        if (order?.business_name)
          orderClient.business_name = order.business_name
        if (order?.second_email) orderClient.second_email = order.second_email

        if (order?.road) orderClient.road = order.road
        if (order?.city) orderClient.city = order.city
        if (order?.province) orderClient.province = order.province

        //COPY TAX
        if (copyTaxDetails?.dateToUse) {
          orderClient.dateToUse = {
            year: copyTaxDetails.dateToUse.getFullYear(),
            month: copyTaxDetails.dateToUse.getMonth() + 1,
            day: copyTaxDetails.dateToUse.getDate(),
          }
        }

        const orderProducts: DataPayload["products"] = products.map(
          (product) => ({
            description: product.product_name,
            amount: Number(product.price),
            quantity: Number(product.quantity),
          })
        )

        payload.order_id = orderID
        payload.client = orderClient
        payload.products = orderProducts

        setLoading(true)

        const downloadUrl = await generateDocument(type, payload)

        setIsOpen(false)
        navigateTo(NavScreens.orderItemViewAs, {
          url: downloadUrl,
          type,
          orderID,
          client: orderClient,
          settings: settings,
        })
        _handleReset()
      },
      [order, products, settings]
    )

    const _handleCopyTaxRequest = useCallback(() => {
      setIsTopOpen(true)
    }, [])

    const _handleCopyTaxCancel = useCallback(() => {
      setIsTopOpen(false)
      Keyboard.dismiss()
      resetForm()
    }, [])

    const _handleCopyTaxSubmit = useCallback(
      (formData: FormFields) => {
        _handleGeneration("copyTax", {
          reference: formData.reference,
          dateToUse: selectedDate,
        })
      },
      [order, products, settings, selectedDate]
    )

    const _handleDatePickerOpenRequest = useCallback(() => {
      if (!loading) {
        setIsDatePickerOpen(true)
      }
    }, [loading])

    const _handleDatepickerCancel = useCallback(() => {
      setIsDatePickerOpen(false)
      setSelectedDate(null)
    }, [])

    const _handleDateSelected = useCallback((date: Date) => {
      setIsDatePickerOpen(false)
      setSelectedDate(date)
    }, [])

    useImperativeHandle(ref, () => ({
      openModal: (
        orderDetails: OrdersData,
        products: Array<OrderProductsData>,
        settingsData: SettingsData
      ) => _handleOpenRequest(orderDetails, products, settingsData),
    }))

    return (
      <Modal
        isOpen={isOpen}
        onCloseRequest={_handleCloseRequest}
        bottom={
          <Dropdown title="Generate order as">
            {loading && !isTopOpen && (
              <ProgressBar indeterminate color={Green.green600} />
            )}

            <Dropdown.Option
              title="Quote"
              onPress={!loading ? () => _handleGeneration("quote") : undefined}
            />
            <Dropdown.Option
              title="Pro Forma"
              onPress={!loading ? () => _handleGeneration("forma") : undefined}
            />
            <Dropdown.Option
              title="Invoice"
              onPress={
                !loading ? () => _handleGeneration("invoice") : undefined
              }
            />
            <Dropdown.Option
              title="Copy Tax"
              onPress={!loading ? _handleCopyTaxRequest : undefined}
              iconSuffixName="chevron-right"
              iconSuffixColor={Green.green600}
            />
          </Dropdown>
        }
        showBottom={!isTopOpen}
        top={
          <Dropdown title="Generate copy tax options">
            <Form.Section>
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <Form.Input
                    control={control as any}
                    name="reference"
                    label="Reference"
                    disabled={loading}
                  />
                </View>

                <Chip
                  title={selectedDate ? formatDate(selectedDate) : "Today"}
                  containerStyle={styles.button}
                  action={!loading ? _handleDatePickerOpenRequest : undefined}
                />
                <DateTimePickerModal
                  isVisible={isDatePickerOpen}
                  onConfirm={_handleDateSelected}
                  onCancel={_handleDatepickerCancel}
                />
              </View>

              <Form.Actions
                submitTitle="Generate"
                loading={loading}
                onSubmit={handleSubmit(_handleCopyTaxSubmit)}
                onCancel={!loading ? _handleCopyTaxCancel : undefined}
                cancelTitle="Cancel"
              />
            </Form.Section>
          </Dropdown>
        }
        showTop={isTopOpen}
      />
    )
  }
)

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
  },
  button: {
    marginLeft: Spacing.lg,
  },
})

export default OrderItemViewAsModal
