import { useState, useEffect, useCallback } from "react"
import { useCollection } from "react-firebase-hooks/firestore"

import { DatabaseReturnType } from "../types"
import { OrderProductsData } from "./types"
import { useFirebase, State } from "../../stores/useFirebase"

const selector = (state: State) => ({ firebase: state.firebase })

export const useOrderProductsData = (
  orderID: string
): DatabaseReturnType<Array<OrderProductsData>> => {
  const [data, setData] = useState<Array<OrderProductsData>>([])
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
      items.forEach((item) => {
        dataTempArr.push({
          ...item.data(),
          id: item.id,
        })
      })

      setData(dataTempArr)
    }
  }, [items])

  const dataToReturn = data

  return {
    state: {
      loading: loading,
      error: error,
    },
    data: dataToReturn,
  }
}
