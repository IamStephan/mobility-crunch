import { useState, useEffect, useCallback } from "react"
import { useCollection } from "react-firebase-hooks/firestore"

import { DatabaseReturnType } from "../types"
import { ProductsData } from "./types"
import { useFirebase, State } from "../../stores/useFirebase"

const selector = (state: State) => ({ firebase: state.firebase })

export const useProductsData = (
  searchTerm: string
): DatabaseReturnType<Array<ProductsData>> => {
  const [data, setData] = useState<Array<ProductsData>>([])
  const { firebase } = useFirebase(selector)

  const query = firebase.firestore().collection("products")
  const [items, loading, error] = useCollection<Omit<ProductsData, "id">>(query)

  useEffect(() => {
    if (items) {
      let dataTempArr: Array<ProductsData> = [] as any
      items.forEach((item) => {
        dataTempArr.push({
          id: item.id,
          ...item.data(),
        })
      })

      setData(dataTempArr)
    }
  }, [items])

  const _filterData = useCallback(() => {
    if (data) {
      // Some perf tweak
      if (searchTerm.trim() === "") return data

      let filteredData: Array<ProductsData> = []

      /**
       * Rather use a for loop than the filter method
       * js provides because in some cases the filter
       * method really sucks(perf)
       */
      const dataLength = data.length
      for (let i = 0; i < dataLength; i++) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase()
        const lowerCaseItemName = data[i].name.toLowerCase()

        if (lowerCaseItemName.includes(lowerCaseSearchTerm)) {
          filteredData.push(data[i])
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
