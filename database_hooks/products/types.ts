export interface ProductsData {
  id: string
  name: string
  price: number

  /**
   * @deprecated
   */
  category?: string

  /**
   * @deprecated
   */
  barcode?: string

  /**
   * @deprecated
   */
  shop_code?: string
}
