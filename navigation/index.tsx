import React, { useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { ColorSchemeName } from "react-native"
import { Provider } from "react-native-paper"
import NetInfo from "@react-native-community/netinfo"
import { showMessage } from "react-native-flash-message"

import RootNavigator from "./root"
import NotificationIcon from "../components/notification_icon"

const MyTheme = {
  dark: false,
  colors: {
    primary: "rgb(255, 45, 85)",
    background: "#ffffff",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
}

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName
}) {
  // Optimistic
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected && isOnline) {
        showMessage({
          message: "Offline",
          description:
            "Mobility Crunch will not work as intented when there is no internet connection.",
          icon: "auto",
          type: "danger",
          renderFlashMessageIcon: () => (
            <NotificationIcon name="signal-wifi-off" />
          ),
        })
        setIsOnline(false)
      } else {
        showMessage({
          message: "Online",
          description: "Your internet connection has been restored.",
          icon: "auto",
          type: "danger",
          renderFlashMessageIcon: () => (
            <NotificationIcon name="network-wifi" />
          ),
        })
        setIsOnline(true)
      }
    })

    return () => unsubscribe()
  }, [setIsOnline])

  return (
    <Provider>
      <NavigationContainer theme={MyTheme}>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  )
}
