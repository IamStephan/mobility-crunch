import React from "react"
import { ScrollView } from "react-native"
import { useForm } from "react-hook-form"

import Icon from "./icon"

import TextInput from "./text_input"

const DummyView = () => {
  const { control } = useForm()

  return (
    <ScrollView
      style={{
        padding: 16,
      }}
    >
      <TextInput placeholder="Placeholder" prefix={<Icon name="search" />} />
    </ScrollView>
  )
}

export default DummyView
