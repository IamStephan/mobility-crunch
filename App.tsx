import { StatusBar } from "expo-status-bar"
import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { PortalProvider, PortalHost } from "@gorhom/portal"
import { LogBox } from "react-native"

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

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <PortalProvider>
          <Navigation colorScheme={colorScheme} />
          <PortalHost name={PortalHosts.modals} />
        </PortalProvider>

        <StatusBar />
      </SafeAreaProvider>
    )
  }
}
