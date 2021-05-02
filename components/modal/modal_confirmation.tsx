import React from "react"
import { View, StyleSheet, Text, ViewStyle } from "react-native"

import {
  Opacity,
  TypographyFamily,
  TypographySizes,
  Spacing,
} from "../../theme"
import { Basic, Primary } from "../../components/button"

interface Props {
  title: string
  description: string
  loading?: boolean

  acceptTitle?: string
  cancelTitle?: string

  acceptStyles?: ViewStyle
  cancelStyles?: ViewStyle

  onAccept?: () => void
  onCancel?: () => void
}

const ModalConfirmation: React.FC<Props> = ({
  title,
  description,
  loading,

  acceptTitle = "Accept",
  cancelTitle = "Cancel",

  acceptStyles,
  cancelStyles,

  onAccept,
  onCancel,
}) => {
  const AcceptStyles = {
    ...styles.buttonSpacing,
    ...acceptStyles,
  }

  const CancelStyles = {
    ...styles.buttonSpacing,
    ...cancelStyles,
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.actionContainer}>
        <Basic
          disabled={loading}
          action={onCancel}
          title={cancelTitle}
          style={CancelStyles}
        />
        <Primary
          loading={loading}
          action={onAccept}
          title={acceptTitle}
          style={AcceptStyles}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.xl,
  },

  title: {
    textAlign: "center",
    fontFamily: TypographyFamily.bold,
    fontSize: TypographySizes.lg,
    marginBottom: Spacing.md,
  },

  buttonSpacing: {
    marginHorizontal: Spacing.sm,
  },

  description: {
    textAlign: "center",
    fontFamily: TypographyFamily.regular,
    opacity: Opacity["opacity-60"],
    marginBottom: Spacing.xl,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
})

export default ModalConfirmation
