import React from "react"
import { StyleSheet } from "react-native"
import { Spacing } from "../../theme"

import Icon, { Props as IconProps } from "../icon"

interface Props {
  name: string
  variant: IconProps["variant"]
}

const NotificationIcon: React.FC<Props> = ({ name, variant }) => {
  return (
    <Icon
      style={styles.icon}
      color="white"
      size={23}
      name={name}
      variant={variant}
    />
  )
}

const styles = StyleSheet.create({
  icon: {
    marginRight: Spacing.md,
  },
})

export default NotificationIcon
