import React, {
  useImperativeHandle,
  forwardRef,
  Ref,
  useState,
  useCallback,
} from "react"
import { View, StyleSheet } from "react-native"
import { ProgressBar } from "react-native-paper"

import Modal from "../../components/modal"
import Dropdown from "../../components/dropdown_menu"
import TextInput from "../../components/text_input"

import { Gray, Green, Spacing } from "../../theme"
import { NavScreens } from "../../constants/screens"

import { OrdersData, OrderProductsData } from "../../database_hooks"

interface DataToSend {
  client: OrdersData
  products: OrderProductsData
}

export interface RefFunctions {
  openModal: () => void
}

interface Props {
  navigateTo: (name: string, params?: any) => void
  goBack?: () => void
}

const OrderItemViewAsCopyTaxModal = forwardRef(
  ({ navigateTo, goBack }: Props, ref: Ref<RefFunctions>) => {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [order, setOrder] = useState<DataToSend | null>(null)

    // const { deleteProduct } = useProductMutations()

    const _handleOpenRequest = useCallback(() => {
      // setOrder(order)
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
      setOrder(null)
    }, [])

    useImperativeHandle(ref, () => ({
      openModal: () => _handleOpenRequest(),
    }))

    return (
      <Modal
        isOpen={isOpen}
        onCloseRequest={_handleCloseRequest}
        bottom={
          <Dropdown title="Generate copy tax">
            {loading && <ProgressBar indeterminate color={Green.green600} />}

            <View style={styles.container}>
              <TextInput />
            </View>
          </Dropdown>
        }
        showBottom
      />
    )
  }
)

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
  },
})

export default OrderItemViewAsCopyTaxModal
