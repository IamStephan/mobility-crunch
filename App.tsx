import React from "react"
import { LogBox } from "react-native"
import { StatusBar } from "expo-status-bar"
import AppLoading from "expo-app-loading"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { PortalProvider, PortalHost } from "@gorhom/portal"
import { ThemeProvider, ThemeProviderProps } from "react-native-magnus"
import {
  useFonts,
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
} from "@expo-google-fonts/roboto"
import FlashMessage from "react-native-flash-message"

import useCachedResources from "./hooks/useCachedResources"
import useColorScheme from "./hooks/useColorScheme"
import Navigation from "./navigation"
import { PortalHosts } from "./constants/portal_hosts"

/**
 * Ignore warning produced by the firebase SDK
 *
 * This error occurs because I'm using the JS version
 * of the SDK and not the native one. This SDK uses
 * setTimeout/setInterval and React Native discourages
 * the use of these methods with long periods of time.
 *
 * Expo...
 */
LogBox.ignoreLogs(["Setting a timer for a long period of time"])

const theme: ThemeProviderProps["theme"] = {
  fontFamily: {
    normal: "Roboto_400Regular",
    bold: "Roboto_700Bold",
    100: "Roboto_100Thin",
    300: "Roboto_300Light",
    400: "Roboto_400Regular",
    500: "Roboto_500Medium",
    700: "Roboto_700Bold",
    900: "Roboto_900Black",
  },
}

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()
  const [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
  })

  if (!isLoadingComplete && !fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <PortalProvider>
            <Navigation colorScheme={colorScheme} />
            <PortalHost name={PortalHosts.modals} />
          </PortalProvider>
        </ThemeProvider>

        <StatusBar />
        <FlashMessage position="top" />
      </SafeAreaProvider>
    )
  }
}
