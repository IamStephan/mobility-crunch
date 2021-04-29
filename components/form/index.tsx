import React from "react"
import { Div } from "react-native-magnus"

import FormSection from "./form_section"
import FormInputText from "./form_text_input"

interface FormComponents {
  Section: typeof FormSection
  Input: typeof FormInputText
}

const Form: React.FC & FormComponents = ({ children }) => {
  return <Div px="lg">{children}</Div>
}

Form.Section = FormSection
Form.Input = FormInputText

export default Form
