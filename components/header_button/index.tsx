import React from "react"
//@ts-ignore
import Icon from "@expo/vector-icons/MaterialIcons"
import {
  HeaderButtons,
  HeaderButton,
  HeaderButtonsProps,
  HeaderButtonProps,
} from "react-navigation-header-buttons"

const MaterialHeaderButton: React.FC<HeaderButtonProps> = (props) => (
  <HeaderButton IconComponent={Icon} iconSize={23} color="blue" {...props} />
)

const MaterialHeaderButtons: React.FC<HeaderButtonsProps> = (props) => {
  return (
    <HeaderButtons HeaderButtonComponent={MaterialHeaderButton} {...props} />
  )
}

export default MaterialHeaderButtons
