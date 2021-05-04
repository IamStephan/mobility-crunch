import { useFirebase, State } from "../../stores/useFirebase"
import { DataPayload } from "./types"

const selector = (state: State) => ({ firebase: state.firebase })

export const useSendEmail = () => {
  const { firebase } = useFirebase(selector)

  const _sendEmail = async (
    type: "quote" | "forma" | "invoice" | "copyTax",
    data: DataPayload
  ) => {
    switch (type) {
      case "quote": {
        await firebase.functions().httpsCallable("sendQuote")(data)
        break
      }

      case "forma": {
        await firebase.functions().httpsCallable("sendForma")(data)
        break
      }

      case "invoice": {
        await firebase.functions().httpsCallable("sendInvoice")(data)
        break
      }

      case "copyTax": {
        await firebase.functions().httpsCallable("sendCopytax")(data)
        break
      }
    }
  }

  return {
    sendEmail: _sendEmail,
  }
}
