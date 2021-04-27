import React from "react"
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native"
import { ColorSchemeName } from "react-native"
import { Provider } from "react-native-paper"
import RootNavigator from "./root"

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
  return (
    <Provider>
      <NavigationContainer theme={MyTheme}>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  )
}
