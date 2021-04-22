import { StatusBar } from "expo-status-bar"
import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { PortalProvider, PortalHost } from "@gorhom/portal"

import useCachedResources from "./hooks/useCachedResources"
import useColorScheme from "./hooks/useColorScheme"
import Navigation from "./navigation"
import { PortalHosts } from "./constants/portal_hosts"

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
