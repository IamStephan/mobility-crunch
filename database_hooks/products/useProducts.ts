import { useState, useEffect, useCallback } from "react"
import { useCollection } from "react-firebase-hooks/firestore"

import { DatabaseReturnType } from "../types"
import { ProductsData } from "./types"
import { useFirebase, State } from "../../stores/useFirebase"

const selector = (state: State) => ({ firebase: state.firebase })

interface Options {
  /**
   * Exclude ids on the initial data
   * set. Does not afect subsequent
   * search filters
   */
  excludeIDs?: Array<string>
}

export const useProductsData = (
  searchTerm: string,
  options?: Options
): DatabaseReturnType<Array<ProductsData>> => {
  const [data, setData] = useState<Array<ProductsData>>([])
  const { firebase } = useFirebase(selector)

  const query = firebase.firestore().collection("products")
  const [items, loading, error] = useCollection<Omit<ProductsData, "id">>(query)

  useEffect(() => {
    if (items) {
      let dataTempArr: Array<ProductsData> = [] as any

      switch (true) {
        case !!options?.excludeIDs && Array.isArray(options.excludeIDs): {
          items.forEach((item) => {
            if (!options?.excludeIDs?.includes(item.id)) {
              dataTempArr.push({
                id: item.id,
                ...item.data(),
              })
            }
          })
          break
        }
        default: {
          items.forEach((item) => {
            dataTempArr.push({
              id: item.id,
              ...item.data(),
            })
          })
        }
      }

      setData(dataTempArr)
    }
  }, [items, options?.excludeIDs])

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
