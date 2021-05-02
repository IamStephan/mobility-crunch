import { useState, useEffect } from "react"
import { useDocument } from "react-firebase-hooks/firestore"

import { DatabaseReturnType } from "../types"
import { OrdersData } from "./types"
import { useFirebase, State } from "../../stores/useFirebase"

const selector = (state: State) => ({ firebase: state.firebase })

interface OrderMutations {
  insertOrder: (data: Omit<OrdersData, "id">) => Promise<void>
  editOrder: (orderID: string, data: Omit<OrdersData, "id">) => Promise<void>
  deleteOrder: (orderID: string) => Promise<void>
}

export const useOrderData = (
  orderID: string
): DatabaseReturnType<OrdersData> => {
  const [data, setData] = useState<OrdersData>()
  const { firebase } = useFirebase(selector)

  const query = firebase.firestore().collection("orders").doc(orderID)
  const [doc, loading, error] = useDocument<Omit<OrdersData, "id">>(query)

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

export const useOrderMutations = (): OrderMutations => {
  const { firebase } = useFirebase(selector)

  const insertOrder = async (data: Omit<OrdersData, "id">) => {
    await firebase.firestore().collection("orders").doc().set(data)
  }

  const editOrder = async (
    orderID: string,
    data: Partial<Omit<OrdersData, "id">>
  ) => {
    await firebase.firestore().collection("orders").doc(orderID).update(data)
  }

  const deleteOrder = async (orderID: string) => {
    await firebase.firestore().collection("orders").doc(orderID).delete()
  }

  return {
    insertOrder,
    editOrder,
    deleteOrder,
  }
}
