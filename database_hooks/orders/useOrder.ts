import { useState, useEffect } from "react"
import { useDocument } from "react-firebase-hooks/firestore"

import { DatabaseReturnType } from "../types"
import { OrdersData } from "./types"
import { useFirebase, State } from "../../stores/useFirebase"

const selector = (state: State) => ({ firebase: state.firebase })

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
