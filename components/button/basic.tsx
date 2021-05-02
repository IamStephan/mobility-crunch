import React from "react"
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
} from "react-native"
import { ActivityIndicator } from "react-native-paper"
import { Gray } from "../../constants/colors"

import { Border, Green, Spacing } from "../../theme"

interface Props {
  title: string
  action?: () => void
  loading?: boolean
  disabled?: boolean
  containerStyle?: ViewStyle
  style?: ViewStyle
}

const Button: React.FC<Props> = ({
  title,
  action,
  loading,
  disabled,
  containerStyle,
  style,
}) => {
  const ComputedTextStyles: TextStyle = {
    opacity: loading ? 0 : 1,
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity onPress={action} disabled={loading || disabled}>
        <View style={[styles.button, style]}>
          <Text numberOfLines={1} style={[styles.text, ComputedTextStyles]}>
            {title}
          </Text>

          {loading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size={21} color={Gray.gray700} />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  button: {
    backgroundColor: "white",
    borderColor: Gray.gray700,
    borderWidth: Border.width,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: 999,
  },
  loaderContainer: {
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Gray.gray700,
    textAlign: "center",
    textTransform: "capitalize",
  },
})

export default Button
