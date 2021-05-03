import React, {
  useImperativeHandle,
  forwardRef,
  Ref,
  useState,
  useCallback,
} from "react"
import { StyleSheet } from "react-native"

import Modal from "../../components/modal"
import Dropdown from "../../components/dropdown_menu"
import { Gray, Red } from "../../theme"
import { OrdersData, useOrderMutations } from "../../database_hooks"
import { NavScreens } from "../../constants/screens"

export interface RefFunctions {
  openModal: (order: OrdersData) => void
}

interface Props {
  navigateTo: (name: string, params?: any) => void
  goBack?: () => void
}

const OrderItemListMoreModal = forwardRef(
  ({ navigateTo, goBack }: Props, ref: Ref<RefFunctions>) => {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showDropdown, setShowDropdown] = useState(true)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [order, setOrder] = useState<OrdersData | null>(null)

    const { deleteOrder } = useOrderMutations()

    const _handleOpenRequest = useCallback((order: OrdersData) => {
      setOrder(order)
      setIsOpen(true)
    }, [])

    const _handleCloseRequest = useCallback(() => {
      if (!loading) {
        setIsOpen(false)
        _handleReset()
      }
    }, [loading])

    const _handleReset = useCallback(() => {
      setShowDropdown(true)
      setShowConfirmation(false)
      setLoading(false)
      setOrder(null)
    }, [])

    const _handeEditOrder = useCallback(() => {
      _handleCloseRequest()
      navigateTo(NavScreens.orderItemUpsert, order)
    }, [order])

    const _handleDeleteRequest = useCallback(() => {
      setShowDropdown(false)
      setShowConfirmation(true)
    }, [])

    const _handleDeleteConfirm = useCallback(async () => {
      setLoading(true)
      if (order?.id) {
        await deleteOrder(order.id)
      }

      if (goBack) {
        goBack()
      }
      _handleCloseRequest()
    }, [order])

    const _handleConfirmationCancel = useCallback(() => {
      setShowDropdown(true)
      setShowConfirmation(false)
    }, [order])

    useImperativeHandle(ref, () => ({
      openModal: (order: OrdersData) => _handleOpenRequest(order),
    }))

    return (
      <Modal
        isOpen={isOpen}
        onCloseRequest={_handleCloseRequest}
        bottom={
          <Dropdown title="Order options">
            <Dropdown.Option
              title="Edit Order Details"
              onPress={_handeEditOrder}
              iconPrefixName="edit"
              iconPrefixColor={Gray.gray400}
            />
            <Dropdown.Option
              title="Delete Order"
              onPress={_handleDeleteRequest}
              iconPrefixName="delete"
              iconPrefixColor={Red.red600}
            />
          </Dropdown>
        }
        showBottom={showDropdown}
        top={
          <Modal.Confirmation
            title="Confirm Deletion"
            description="Deleting an order is a permanent action and cannot be undone."
            acceptTitle="Delete"
            acceptStyles={styles.deleteButton}
            onAccept={_handleDeleteConfirm}
            onCancel={_handleConfirmationCancel}
            loading={loading}
          />
        }
        showTop={showConfirmation}
      />
    )
  }
)

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: Red.red600,
  },
})

export default OrderItemListMoreModal
