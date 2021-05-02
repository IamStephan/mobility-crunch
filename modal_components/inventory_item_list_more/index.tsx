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
import { ProductsData, useProductMutations } from "../../database_hooks"
import { NavScreens } from "../../constants/screens"

export interface RefFunctions {
  openModal: (product: ProductsData) => void
}

interface Props {
  navigateTo: (name: string, params?: any) => void
  goBack?: () => void
}

const InventoryItemListMoreModal = forwardRef(
  ({ navigateTo, goBack }: Props, ref: Ref<RefFunctions>) => {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showDropdown, setShowDropdown] = useState(true)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [product, setProduct] = useState<ProductsData | null>(null)

    const { deleteProduct } = useProductMutations()

    const _handleOpenRequest = useCallback((product: ProductsData) => {
      setProduct(product)
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
      setProduct(null)
    }, [])

    const _handeEditProduct = useCallback(() => {
      _handleCloseRequest()
      navigateTo(NavScreens.inventoryItemUpsert, product)
    }, [product])

    const _handleDeleteRequest = useCallback(() => {
      setShowDropdown(false)
      setShowConfirmation(true)
    }, [])

    const _handleDeleteConfirm = useCallback(async () => {
      setLoading(true)
      if (product?.id) {
        await deleteProduct(product.id)
      }
      if (goBack) {
        goBack()
      }
      _handleCloseRequest()
    }, [product])

    const _handleConfirmationCancel = useCallback(() => {
      setShowDropdown(true)
      setShowConfirmation(false)
    }, [product])

    useImperativeHandle(ref, () => ({
      openModal: (product: ProductsData) => _handleOpenRequest(product),
    }))

    return (
      <Modal
        isOpen={isOpen}
        onCloseRequest={_handleCloseRequest}
        bottom={
          <Dropdown title="Product Options">
            <Dropdown.Option
              title="Edit Product"
              onPress={_handeEditProduct}
              iconPrefixName="edit"
              iconPrefixColor={Gray.gray400}
            />
            <Dropdown.Option
              title="Delete Product"
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
            description="Deleting a product is a permanent action and cannot be undone."
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

export default InventoryItemListMoreModal
