import React, { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import Form from "../../components/form"
import { SettingsData, useSettingsMutations } from "../../database_hooks"

interface FormValues {
  vat: string
}

const formSchema = yup.object().shape({
  vat: yup
    .number()
    .min(0, "Vat cannot be less than 0%")
    .max(100, "Vat cannot be more than 100%")
    .required("Vat is required")
    .typeError("Vat is required"),
})

interface Props {
  data?: SettingsData
  goBack: () => void
}

// Form Sections do not need live data
const SettingsEditSection: React.FC<Props> = ({ data, goBack }) => {
  const [loading, setLoading] = useState(false)

  const { setVatValue } = useSettingsMutations()

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      vat: data?.vat ? `${data.vat}` : "",
    },
  })

  const _handleEditSettings = useCallback(async (formData: FormValues) => {
    await setVatValue(Number(formData.vat))
  }, [])

  const _onSubmit = async (data: FormValues) => {
    setLoading(true)

    await _handleEditSettings(data)
    goBack()

    setLoading(false)
  }

  return (
    <Form>
      <Form.Section
        heading="General Information"
        iconName="info"
        indentChildrenWithIcon={false}
        showDivider={false}
      >
        <Form.Input
          control={control as any}
          keyboardType="number-pad"
          name="vat"
          label="Vat percentage"
          isRequired
        />

        <Form.Submit
          title="Save Settings"
          loading={loading}
          onSubmit={handleSubmit(_onSubmit)}
        />
      </Form.Section>
    </Form>
  )
}

export default SettingsEditSection
