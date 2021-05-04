export interface DataPayload {
  /**
   * This is the actual order number but it overrides
   * subsequent documents, rather use this as an opportunity
   * to use the actual document number
   */
  order_id: string
  copyTaxNum?: string | undefined
  client: {
    email: string
    client_name: String

    business_name?: string
    city?: string
    phone?: string
    province?: string
    road?: string
    second_email?: string
    vat_number?: string
  }

  /**
   * WTF the function params do not match the \
   * document store structure
   */
  products: Array<{
    description: string
    amount: number
    quantity: number
  }>
}
