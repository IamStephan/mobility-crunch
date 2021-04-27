export interface OrdersData {
  id: string
  email: string
  client_name: string
  state: "pending" | "complete"

  business_name?: string
  city?: string
  phone?: string
  province?: string
  road?: string
  second_email?: string
  vat_number?: string
}
