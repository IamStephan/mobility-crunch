import React, { useCallback, useLayoutEffect, useState } from "react"
import { View, StyleSheet } from "react-native"
import {
  Button,
  TextInput,
  Caption,
  ActivityIndicator,
} from "react-native-paper"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { useSettingsMutations } from "../../database_hooks"
import Modal, { Props as ModalProps } from "../../components/modal"

const FormSchema = yup.object().shape({
  vatChangeValue: yup.number().min(1).max(100).required(),
})

interface FormFields {
  vatChangeValue: string
}

interface Props extends ModalProps {
  trueVat: string
}

const EditVatPercentageModal: React.FC<Props> = ({
  trueVat,
  ...modalProps
}) => {
  const [isEditLoading, setIsEditLoading] = useState(false)
  const { setVatValue } = useSettingsMutations()

  const { control, handleSubmit, formState, setValue } = useForm<FormFields>({
    defaultValues: {
      vatChangeValue: "0",
    },
    resolver: yupResolver(FormSchema),
  })

  /**
   * Set the form value to the true value if
   * it changes
   */
  useLayoutEffect(() => {
    if (modalProps.isOpen) {
      setValue("vatChangeValue", trueVat, { shouldValidate: true })
    }
  }, [trueVat, modalProps.isOpen])

  const _onRequestCloseInterceptor = useCallback(() => {
    if (!isEditLoading) {
      modalProps.onCloseRequest()
    }
  }, [isEditLoading])

  /**
   *
   */
  const _handleSubmit = async (data: FormFields) => {
    const vatNumber = Number(data.vatChangeValue)
    setIsEditLoading(true)

    try {
      await setVatValue(vatNumber)
      modalProps.onCloseRequest()
    } catch (e) {
      console.log("oops, send notification")
    } finally {
      setIsEditLoading(false)
    }
  }

  return (
    <Modal {...modalProps} onCloseRequest={_onRequestCloseInterceptor}>
      <View style={styles.titleContainer}>
        <Caption style={styles.title}>Edit VAT percentage</Caption>

        <ActivityIndicator color="green" animating={isEditLoading} />
      </View>

      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="vatChangeValue"
          render={({
            field: { onChange, onBlur, value },
            formState: { errors },
          }) => (
            <TextInput
              value={value}
              onChangeText={(text) => onChange(text)}
              dense
              keyboardType="numeric"
              onBlur={onBlur}
              style={styles.formInput}
              mode="outlined"
              error={!!errors.vatChangeValue}
              disabled={isEditLoading}
            />
          )}
        />

        <Button
          mode="contained"
          style={styles.formButton}
          onPress={handleSubmit(_handleSubmit)}
          disabled={isEditLoading}
        >
          Save
        </Button>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
  },
  title: {
    flex: 1,
  },
  formContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },

  formButton: {
    elevation: 0,
    alignSelf: "center",
  },

  formInput: {
    backgroundColor: "white",
    marginBottom: 10,
    marginRight: 10,
    flex: 1,
  },
})

export default EditVatPercentageModal
