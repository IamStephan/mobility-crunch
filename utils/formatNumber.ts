import currency from "currency.js"

export const ZAR = (value: number) =>
  currency(value, { precision: 2, symbol: "R", separator: " " }).format()
