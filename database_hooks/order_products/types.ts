export interface OrderProductsData {
  id: string
  order_id: string
  product_id: string
  product_name: string

  // WTF was i thinking in v1
  // BUT in the functions they are actual numbers!!!
  price: string
  quantity: string
}
