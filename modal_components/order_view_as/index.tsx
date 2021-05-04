import React, {
  useImperativeHandle,
  forwardRef,
  Ref,
  useState,
  useCallback,
} from "react"
import { ProgressBar } from "react-native-paper"

import Modal from "../../components/modal"
import Dropdown from "../../components/dropdown_menu"
import { Gray, Green, Red } from "../../theme"
import {
  OrdersData,
  OrderProductsData,
  SettingsData,
} from "../../database_hooks"
import { NavScreens } from "../../constants/screens"

import { useDocumentGeneration, DataPayload } from "../../functions_hooks"

export interface RefFunctions {
  openModal: (
    orderDetails: OrdersData,
    products: Array<OrderProductsData>,
    settingsData: SettingsData
  ) => void
}

interface Props {
  navigateTo: (name: string, params?: any) => void
  goBack?: () => void
}

const OrderItemViewAsModal = forwardRef(
  ({ navigateTo, goBack }: Props, ref: Ref<RefFunctions>) => {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [order, setOrder] = useState<OrdersData | null>(null)
    const [products, setProducts] = useState<Array<OrderProductsData>>([])
    const [settings, setSettings] = useState<SettingsData | null>(null)

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
      setOrder(null)
      setProducts([])
      setSettings(null)
    }, [])

    const _handleGeneration = useCallback(
      async (type: "quote" | "forma" | "invoice") => {
        let orderID: DataPayload["order_id"] = ""

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
        }

        let orderClient: DataPayload["client"] = {} as DataPayload["client"]
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

        const orderProducts: DataPayload["products"] = products.map(
          (product) => ({
            description: product.product_name,
            amount: Number(product.price),
            quantity: Number(product.quantity),
          })
        )

        const payload: DataPayload = {
          order_id: orderID,
          client: orderClient,
          products: orderProducts,
        }

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
            {loading && <ProgressBar indeterminate color={Green.green600} />}

            <Dropdown.Option
              title="Quote"
              onPress={() => _handleGeneration("quote")}
            />
            <Dropdown.Option
              title="Pro Forma"
              onPress={() => _handleGeneration("forma")}
            />
            <Dropdown.Option
              title="Invoice"
              onPress={() => _handleGeneration("invoice")}
            />
          </Dropdown>
        }
        showBottom
      />
    )
  }
)

export default OrderItemViewAsModal
