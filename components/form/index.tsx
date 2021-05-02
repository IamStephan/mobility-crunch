import React from "react"
import { View, StyleSheet } from "react-native"

import { Spacing } from "../../theme"

import Section from "../section"
import FormInputText from "./form_text_input"
import FormSubmit from "./form_submit"

interface FormComponents {
  Section: typeof Section
  Input: typeof FormInputText
  Submit: typeof FormSubmit
}

const Form: React.FC & FormComponents = ({ children }) => {
  return <View>{children}</View>
}

// Proxy Component
Form.Section = Section
Form.Input = FormInputText
Form.Submit = FormSubmit

export default Form
