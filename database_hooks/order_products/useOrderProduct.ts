import { OrderProductsData } from "./types"
import { useFirebase, State } from "../../stores/useFirebase"

const selector = (state: State) => ({ firebase: state.firebase })

interface ProductMutations {
  editProduct: (
    orderProductID: string,
    data: Pick<OrderProductsData, "product_name" | "price" | "quantity">
  ) => Promise<void>
}

export const useOrderProductMutations = (): ProductMutations => {
  const { firebase } = useFirebase(selector)

  const editProduct = async (
    orderProductID: string,
    data: Pick<OrderProductsData, "product_name" | "price" | "quantity">
  ) => {
    await firebase
      .firestore()
      .collection("order-products")
      .doc(orderProductID)
      .update(data)
  }

  return {
    editProduct,
  }
}
