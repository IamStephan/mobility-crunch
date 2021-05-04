import React, {
  useImperativeHandle,
  forwardRef,
  Ref,
  useState,
  useCallback,
} from "react"
import { StyleSheet, View } from "react-native"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import Form from "../../components/form"
import Modal from "../../components/modal"
import DropDown from "../../components/dropdown_menu"
import { useSendEmail } from "../../functions_hooks"
import { Spacing } from "../../theme"
import { OrdersData, SettingsData } from "../../database_hooks"

interface FormFields {
  message: string
}

const formSchema = yup.object().shape({
  message: yup.string(),
})

interface OpenData {
  type: "quote" | "forma" | "invoice" | "copyTax"
  settingsDetails: SettingsData
  orderDetails: OrdersData
}

export interface RefFunctions {
  openModal: (data: OpenData) => void
}

interface Props {
  goBack: () => void
}

const OrderItemViewAsModal = forwardRef(
  ({ goBack }: Props, ref: Ref<RefFunctions>) => {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<OpenData | null>(null)

    const { control, handleSubmit } = useForm<FormFields>({
      resolver: yupResolver(formSchema),
      defaultValues: {
        message: "Please see attached document.",
      },
    })

    const { sendEmail } = useSendEmail()

    const _handleOpenRequest = useCallback((data: OpenData) => {
      setData(data)
      setIsOpen(true)
    }, [])

    const _handleCloseRequest = useCallback(() => {
      if (!loading) {
        setIsOpen(false)
        _handleReset()
      }
    }, [loading])

    const _handleReset = useCallback(() => {
      setLoading(false)
      setData(null)
    }, [])

    const _handleSendRequest = useCallback(
      async (formData: FormFields) => {
        if (data) {
          setLoading(true)
          await sendEmail(data.type, {
            order_id: `${data.settingsDetails.current_quote_num}`,
            emailMessage: formData.message,
            email: data.orderDetails.email,
            second_email: data.orderDetails.second_email,
          })

          goBack()
          _handleReset()
          setIsOpen(false)
        }
      },
      [data]
    )

    useImperativeHandle(ref, () => ({
      openModal: (data: OpenData) => _handleOpenRequest(data),
    }))

    return (
      <Modal
        isOpen={isOpen}
        onCloseRequest={_handleCloseRequest}
        bottom={
          <DropDown title="Email options">
            <View style={styles.container}>
              <Form.Input
                numberOfLines={5}
                label="Message"
                control={control as any}
                name="message"
                multiline
              />

              <Form.Submit
                title="Send Email"
                onSubmit={handleSubmit(_handleSendRequest)}
                loading={loading}
              />
            </View>
          </DropDown>
        }
        showBottom
      />
    )
  }
)

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.lg,
  },
})

export default OrderItemViewAsModal
