import React from "react"
import { View, StyleSheet } from "react-native"

import { Spacing } from "../../theme"
import { Primary, Basic } from "../button"

interface Props {
  submitTitle: string
  cancelTitle: string
  onSubmit?: () => void
  onCancel?: () => void
  loading?: boolean
}

const FormSubmut: React.FC<Props> = ({
  submitTitle,
  cancelTitle,
  onSubmit,
  onCancel,
  loading,
}) => {
  return (
    <View style={styles.container}>
      <Basic action={onCancel} title={cancelTitle} disabled={loading} />
      <Primary
        action={onSubmit}
        title={submitTitle}
        loading={loading}
        containerStyle={styles.buttonWrapper}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.lg,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  buttonWrapper: {
    marginLeft: Spacing.md,
  },
})

export default FormSubmut
