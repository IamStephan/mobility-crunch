import React from "react"

interface Props {
  loading?: boolean
  loadingComponent: React.ReactElement
  loadedComponent: React.ReactElement
}

const LoadingSwitch: React.FC<Props> = ({
  loading,
  loadedComponent,
  loadingComponent,
}) => {
  return loading ? loadingComponent : loadedComponent
}

export default LoadingSwitch
