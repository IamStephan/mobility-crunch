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
import { OrdersData, OrderProductsData } from "../../database_hooks"
import { NavScreens } from "../../constants/screens"

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

const OrderItemViewAsModal = forwardRef(
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
          <Dropdown title="Generate order as">
            {loading && <ProgressBar indeterminate color={Green.green600} />}

            <Dropdown.Option
              title="Quote"
              // onPress={_handeEditProduct}
            />
            <Dropdown.Option
              title="Pro Forma"
              // onPress={_handeEditProduct}
            />
            <Dropdown.Option
              title="Invoice"
              // onPress={_handeEditProduct}
            />
          </Dropdown>
        }
        showBottom
      />
    )
  }
)

export default OrderItemViewAsModal
