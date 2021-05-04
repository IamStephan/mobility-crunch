import { useSettingsData } from "../../database_hooks"

import { useFirebase, State } from "../../stores/useFirebase"
import { DataPayload } from "./types"

const selector = (state: State) => ({ firebase: state.firebase })

export const useDocumentGeneration = () => {
  const { firebase } = useFirebase(selector)

  const _generateDocument = async (
    type: "quote" | "forma" | "invoice",
    data: DataPayload
  ) => {
    let downloadUrl = ""
    switch (type) {
      case "quote": {
        await firebase.functions().httpsCallable("generateQuote")(data)
        downloadUrl = await firebase
          .storage()
          .ref(`quotes/quote-${data.order_id}.pdf`)
          .getDownloadURL()
        break
      }

      case "forma": {
        await firebase.functions().httpsCallable("generateForma")(data)
        downloadUrl = await firebase
          .storage()
          .ref(`forma/forma-${data.order_id}.pdf`)
          .getDownloadURL()
        break
      }

      case "invoice": {
        await firebase.functions().httpsCallable("generateInvoice")(data)
        downloadUrl = await firebase
          .storage()
          .ref(`invoices/invoice-${data.order_id}.pdf`)
          .getDownloadURL()
        break
      }
    }

    return downloadUrl
  }

  return {
    generateDocument: _generateDocument,
  }
}
