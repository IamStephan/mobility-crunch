import React from "react"
import { View, StyleSheet } from "react-native"

import { Spacing } from "../../theme"
import Button from "../button"

interface Props {
  title: string
  onSubmit?: () => void
  loading?: boolean
}

const FormSubmut: React.FC<Props> = ({ title, onSubmit, loading }) => {
  return (
    <View style={styles.container}>
      <Button
        action={onSubmit}
        title={title}
        loading={loading}
        containerStyle={styles.buttonWrapper}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.lg,
  },
  buttonWrapper: {
    alignSelf: "flex-end",
  },
})

export default FormSubmut
