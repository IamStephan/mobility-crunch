import { useState, useEffect, useCallback } from "react"
import { useCollection } from "react-firebase-hooks/firestore"

import { DatabaseReturnType } from "../types"
import { OrdersData } from "./types"
import { useFirebase, State } from "../../stores/useFirebase"

const selector = (state: State) => ({ firebase: state.firebase })

export const useOrdersData = (
  searchTerm: string
): DatabaseReturnType<Array<OrdersData>> => {
  const [data, setData] = useState<Array<OrdersData>>([])
  const { firebase } = useFirebase(selector)

  // Temp Limit
  const query = firebase.firestore().collection("orders").limit(30)
  const [items, loading, error] = useCollection<Omit<OrdersData, "id">>(query)

  useEffect(() => {
    if (items) {
      let dataTempArr: Array<OrdersData> = [] as any
      items.forEach((item) => {
        dataTempArr.push({
          ...item.data(),
          id: item.id,
          docReference: item.ref,
        })
      })

      setData(dataTempArr)
    }
  }, [items])

  const _filterData = useCallback(() => {
    if (data) {
      // Some perf tweak
      if (searchTerm.trim() === "") return data

      let filteredData: Array<OrdersData> = []

      /**
       * Rather use a for loop than the filter method
       * js provides because in some cases the filter
       * method really sucks(perf)
       */
      const dataLength = data.length
      for (let i = 0; i < dataLength; i++) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase()
        const lowerCaseItemName = data[i].client_name.toLowerCase()

        if (lowerCaseItemName.includes(lowerCaseSearchTerm)) {
          filteredData.push(data[i])
          continue
        }

        // Checking optional Fields
        const businessName = data[i]?.business_name
        if (typeof businessName === "string") {
          const lowerCaseBusinessName = businessName.toLowerCase()

          if (lowerCaseBusinessName.includes(lowerCaseSearchTerm)) {
            filteredData.push(data[i])
          }
        }
      }

      return filteredData
    }
    return []
  }, [searchTerm, data])

  const dataToReturn = _filterData()

  return {
    state: {
      loading: loading,
      error: error,
    },
    data: dataToReturn,
  }
}
