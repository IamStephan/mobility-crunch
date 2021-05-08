import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { Provider } from "react-native-paper"

import RootNavigator from "./root"
import { Gray, Green } from "../theme"

const NavTheme = {
  dark: false,
  colors: {
    primary: Green.green600,
    background: "white",
    card: "white",
    text: Gray.gray900,
    border: Gray.gray200,
    notification: Green.green600,
  },
}

export default function Navigation() {
  return (
    <Provider>
      <NavigationContainer theme={NavTheme}>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  )
}
