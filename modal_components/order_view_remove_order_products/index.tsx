import React, {
  useImperativeHandle,
  forwardRef,
  Ref,
  useState,
  useCallback,
} from "react"
import { StyleSheet } from "react-native"

import Modal from "../../components/modal"
import { Red } from "../../theme"
import { useOrderProductsMutations } from "../../database_hooks"

export interface RefFunctions {
  openModal: (orderProductIDs: Array<string>) => void
}

interface Props {
  onClose: () => void
}

const OrderViewRemoveOrderProduct = forwardRef(
  ({ onClose }: Props, ref: Ref<RefFunctions>) => {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [orderProductIDs, setOrderProductIDs] = useState<Array<string>>([])

    const { removeOrderProducts } = useOrderProductsMutations()

    const _handleOpenRequest = useCallback((orderProductIDs: Array<string>) => {
      setOrderProductIDs(orderProductIDs)
      setIsOpen(true)
    }, [])

    const _handleReset = useCallback(() => {
      setLoading(false)
      setOrderProductIDs([])
    }, [])

    const _handleRemoveOrderProducts = useCallback(async () => {
      setLoading(true)

      await removeOrderProducts(orderProductIDs)

      onClose()
      setIsOpen(false)
      _handleReset()
    }, [orderProductIDs])

    const _handleCloseOverlay = useCallback(() => {
      _handleReset()
      setIsOpen(false)
      _handleReset()
    }, [])

    const _handleCancel = useCallback(() => {
      _handleReset()
      setIsOpen(false)
      _handleReset()
    }, [])

    useImperativeHandle(ref, () => ({
      openModal: (orderProductIDs: Array<string>) =>
        _handleOpenRequest(orderProductIDs),
    }))

    return (
      <Modal
        isOpen={isOpen}
        onCloseRequest={_handleCloseOverlay}
        top={
          <Modal.Confirmation
            title="Confirm Remove"
            description={`${orderProductIDs.length}`}
            acceptTitle={`Remove Item${orderProductIDs.length > 1 ? "s" : ""}`}
            acceptStyles={styles.deleteButton}
            onAccept={_handleRemoveOrderProducts}
            onCancel={_handleCancel}
            loading={loading}
          />
        }
        showTop
      />
    )
  }
)

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: Red.red600,
  },
})

export default OrderViewRemoveOrderProduct
