import React from "react"
import { View } from "react-native"

import Section from "../section"
import FormInputText from "./form_text_input"
import FormSubmit from "./form_submit"
import FormActions from "./form_actions"

interface FormComponents {
  Section: typeof Section
  Input: typeof FormInputText
  Submit: typeof FormSubmit
  Actions: typeof FormActions
}

const Form: React.FC & FormComponents = ({ children }) => {
  return <View>{children}</View>
}

// Proxy Component
Form.Section = Section
Form.Input = FormInputText
Form.Submit = FormSubmit
Form.Actions = FormActions

export default Form
