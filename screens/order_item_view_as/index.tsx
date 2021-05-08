import React, { useState, useCallback, useRef } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import PFDReader from "rn-pdf-reader-js"
import { StackScreenProps } from "@react-navigation/stack"
import { ActivityIndicator } from "react-native-paper"

import { Gray, Green, Spacing, TypographySizes } from "../../theme"
import Icon from "../../components/icon"

import OrderItemViewAsMessageModal, {
  RefFunctions as ModalRef,
} from "../../modal_components/order_item_view_as_message"
import { OrdersData, SettingsData } from "../../database_hooks"

const OrderItemViewAsScreen: React.FC<StackScreenProps<any>> = ({
  navigation,
  route,
}) => {
  const params = route.params as {
    url: string
    type: "quote" | "forma" | "invoice" | "copyTax"
    orderID: string
    client: OrdersData
    settings: SettingsData
  }
  const [loading, setLoading] = useState(true)
  const [pingPong, setPingPong] = useState("pink")

  const modalRef = useRef<ModalRef>(null)

  const _handleRefresh = useCallback(() => {
    if (!loading) {
      setPingPong((prev) => (prev === "ping" ? "pong" : "ping"))
      setLoading(true)
    }
  }, [loading])

  const _handleSendEmailRequest = useCallback(() => {
    modalRef.current?.openModal({
      settingsDetails: params.settings,
      orderDetails: params.client,
      type: params.type,
    })
  }, [])

  return (
    <>
      <View style={styles.container}>
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator
              color={Green.green600}
              size={TypographySizes.xl}
            />
          </View>
        )}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionItem} onPress={_handleRefresh}>
            <View>
              <Icon color={Gray.gray600} name="refresh" size={23} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionItem}
            onPress={_handleSendEmailRequest}
          >
            <View>
              <Icon color={Green.green600} name="outgoing-mail" size={23} />
            </View>
          </TouchableOpacity>
        </View>
        <PFDReader
          onLoad={() => setLoading(false)}
          key={pingPong}
          source={{
            uri: params.url,
          }}
        />
      </View>

      <OrderItemViewAsMessageModal goBack={navigation.goBack} ref={modalRef} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "white",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  actionContainer: {
    flexDirection: "row",
  },
  actionItem: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "50%",
    paddingVertical: Spacing.md,
    alignItems: "center",
  },
})

export default OrderItemViewAsScreen
