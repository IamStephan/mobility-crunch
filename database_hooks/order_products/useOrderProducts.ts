import { useState, useEffect } from "react"
import { useCollection } from "react-firebase-hooks/firestore"

import { DatabaseReturnType } from "../types"
import { OrderProductsData } from "./types"
import { useFirebase, State } from "../../stores/useFirebase"

const selector = (state: State) => ({ firebase: state.firebase })

interface Meta {
  productIDs: Array<string>
}

interface OrderProductsMutation {
  insertOrderProducts: (
    orderProducts: Array<Omit<OrderProductsData, "id">>
  ) => Promise<void>
  removeOrderProducts: (orderProductIDs: Array<string>) => Promise<void>
}

export const useOrderProductsData = (
  orderID: string
): DatabaseReturnType<Array<OrderProductsData>, Meta> => {
  const [data, setData] = useState<Array<OrderProductsData>>([])
  const [productIDs, setProductIDs] = useState<Array<string>>([])
  const { firebase } = useFirebase(selector)

  // Temp Limit
  const query = firebase
    .firestore()
    .collection("order-products")
    .where("order_id", "==", orderID)
  const [items, loading, error] = useCollection<Omit<OrderProductsData, "id">>(
    query
  )

  useEffect(() => {
    if (items) {
      let dataTempArr: Array<OrderProductsData> = [] as any
      let dataTempIdArr: Array<string> = [] as any
      items.forEach((item) => {
        dataTempArr.push({
          ...item.data(),
          id: item.id,
        })
        dataTempIdArr.push(item.data().product_id)
      })

      setData(dataTempArr)
      setProductIDs(dataTempIdArr)
    }
  }, [items])

  const dataToReturn = data

  return {
    state: {
      loading: loading,
      error: error,
    },
    data: dataToReturn,
    meta: {
      productIDs: productIDs,
    },
  }
}

export const useOrderProductsMutations = (): OrderProductsMutation => {
  const { firebase } = useFirebase(selector)

  const insertOrderProducts = async (
    orderProducts: Array<Omit<OrderProductsData, "id">>
  ) => {
    const batch = firebase.firestore().batch()

    orderProducts.forEach((orderProduct) => {
      const orderProductRef = firebase
        .firestore()
        .collection("order-products")
        .doc()
      batch.set(orderProductRef, orderProduct as Omit<OrderProductsData, "id">)
    })

    await batch.commit()
  }

  const removeOrderProducts = async (orderProductIDs: Array<string>) => {
    const batch = firebase.firestore().batch()

    orderProductIDs.forEach((orderProductID) => {
      const orderProductRef = firebase
        .firestore()
        .collection("order-products")
        .doc(orderProductID)
      batch.delete(orderProductRef)
    })

    await batch.commit()
  }

  return {
    insertOrderProducts,
    removeOrderProducts,
  }
}
