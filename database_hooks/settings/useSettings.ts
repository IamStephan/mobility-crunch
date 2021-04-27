import { useDocumentData } from "react-firebase-hooks/firestore"

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
  const { firebase } = useFirebase(selector)
  const query = firebase.firestore().collection("settings").doc("v1")
  const [data, loading, error] = useDocumentData<SettingsData>(query)

  return {
    state: {
      loading,
      error,
    },
    data,
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
