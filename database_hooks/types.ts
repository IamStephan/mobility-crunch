import firebase from "firebase"

export interface DatabaseReturnType<D, M = null> {
  /**
   * @description internal state of the hook
   */
  state: {
    /**
     * @description initial data load where data is still cold
     */
    loading: boolean
    /**
     * @description firebase error object
     */
    error: firebase.FirebaseError | undefined
  }

  /**
   * @description Data from the database
   */
  data?: D

  /**
   * @description Used for additional information
   */
  meta?: M
}
