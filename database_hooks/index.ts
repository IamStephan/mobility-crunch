/**
 * NOTE:
 * =====
 * Collection methods need to be optimized for reads
 * currently they get the entire collection instead of just paginating
 * the collections. The reasoning behind this is to allow for client
 * side text filtering and search as firestore does not support this,
 * and using a third party service would incur more costs
 *
 * TODO: find a way to store and update data locally (Adapter pattern?)
 */

// Types
export { DatabaseReturnType } from "./types"

/**
 * PRODUCTS
 */
export { useProductsData } from "./products/useProducts"
export { ProductsData } from "./products/types"

/**
 * SETTINGS
 */
export {
  useSettingsData,
  useSettingsMutations,
  SettingsData,
  SettingsMutations,
} from "./settings/useSettings"
