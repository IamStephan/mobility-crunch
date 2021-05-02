import React from "react"
import { ViewProps, StyleSheet } from "react-native"
//@ts-ignore
import IconMaterial from "@expo/vector-icons/MaterialIcons"
//@ts-ignore
import IconMaterialCommunity from "@expo/vector-icons/MaterialIcons"

import { TypographySizes, Gray, Opacity } from "../../theme"

export interface Props {
  name: string
  variant?: "material" | "materialCommunity"
  size?: number
  color?: string
  style?: ViewProps["style"]
}

const Icon: React.FC<Props> = ({
  name,
  variant = "material",
  size = TypographySizes.md,
  color = Gray.gray900,
  style,
}) => {
  switch (variant) {
    case "materialCommunity": {
      return (
        <IconMaterialCommunity
          name={name}
          size={size}
          color={color}
          style={style}
        />
      )
    }

    case "materialCommunity":
    default: {
      return (
        <IconMaterial name={name} size={size} color={color} style={style} />
      )
    }
  }
}

export default Icon
