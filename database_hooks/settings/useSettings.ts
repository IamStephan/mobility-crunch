import { useState, useEffect } from "react"

import { useDocument } from "react-firebase-hooks/firestore"

import { DatabaseReturnType } from "../types"
import { useFirebase, State } from "../../stores/useFirebase"

const selector = (state: State) => ({ firebase: state.firebase })

export interface SettingsMutations {
  setVatValue: (vatValue: number) => Promise<void>
}

export interface SettingsData {
  current_forma_num: number
  current_invoice_num: number
  current_quote_num: number
  debug: boolean
  vat: number
}

export const useSettingsData = (): DatabaseReturnType<SettingsData> => {
  const [data, setData] = useState<SettingsData>()

  const { firebase } = useFirebase(selector)
  const query = firebase.firestore().collection("settings").doc("v1")
  const [doc, loading, error] = useDocument<SettingsData>(query)

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
      loading,
      error,
    },
    data: dataToReturn,
  }
}

export const useSettingsMutations = (): SettingsMutations => {
  const { firebase } = useFirebase(selector)

  const setVatValue = async (vatValue: number) => {
    await firebase
      .firestore()
      .collection("settings")
      .doc("v1")
      .update({
        vat: vatValue,
      } as Pick<SettingsData, "vat">)
  }

  return {
    setVatValue,
  }
}
