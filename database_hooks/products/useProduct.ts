import { useState, useEffect } from "react"
import { useDocument } from "react-firebase-hooks/firestore"

import { DatabaseReturnType } from "../types"
import { ProductsData } from "./types"
import { useFirebase, State } from "../../stores/useFirebase"

const selector = (state: State) => ({ firebase: state.firebase })

interface ProductMutatableValues {
  name: string
  price: number
}

interface ProductMutations {
  insertProduct: (data: ProductMutatableValues) => Promise<void>
  editProduct: (
    productID: string,
    data: Partial<ProductMutatableValues>
  ) => Promise<void>
  deleteProduct: (productID: string) => Promise<void>
}

export const useProductData = (
  productID: string
): DatabaseReturnType<ProductsData> => {
  const [data, setData] = useState<ProductsData>()
  const { firebase } = useFirebase(selector)

  const query = firebase.firestore().collection("products").doc(productID)
  const [doc, loading, error] = useDocument<Omit<ProductsData, "id">>(query)

  useEffect(() => {
    if (doc) {
      const data: any = {
        ...doc.data(),
        id: doc.id,
      }

      setData(data)
    }
  }, [doc])

  const dataToReturn = data

  return {
    state: {
      loading: loading,
      error: error,
    },
    data: dataToReturn,
  }
}

export const useProductMutations = (): ProductMutations => {
  const { firebase } = useFirebase(selector)

  const insertProduct = async (data: ProductMutatableValues) => {
    await firebase.firestore().collection("products").doc().set(data)
  }

  const editProduct = async (
    productID: string,
    data: Partial<ProductMutatableValues>
  ) => {
    await firebase
      .firestore()
      .collection("products")
      .doc(productID)
      .update(data)
  }

  const deleteProduct = async (productID: string) => {
    await firebase.firestore().collection("products").doc(productID).delete()
  }

  return {
    insertProduct,
    editProduct,
    deleteProduct,
  }
}
