import React from "react"
import { View, StyleSheet } from "react-native"
import { Button } from "react-native-paper"

import Layout from "../../constants/layout"

const OrderItemViewActions = () => {
  return null
  return (
    <View style={styles.container} key="hi">
      <Button
        theme={{
          roundness: 9999,
        }}
        style={{
          backgroundColor: "green",
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}
        mode={"contained"}
      >
        View as
      </Button>
      <Button
        theme={{
          roundness: 9999,
        }}
        style={{
          // backgroundColor: "green",
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}
        mode={"outlined"}
      >
        Mark as
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Layout.spacing * 2,
    flexDirection: "row",
    justifyContent: "center",
  },
})

export default OrderItemViewActions
