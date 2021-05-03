import React, { useCallback, useRef } from "react"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import {
  createStackNavigator,
  StackNavigationOptions,
  HeaderTitle,
  StackHeaderTitleProps,
  TransitionPresets,
} from "@react-navigation/stack"
import { useRoute, useNavigation } from "@react-navigation/native"

import { NavScreens } from "../../constants/screens"
import InventoryItemMoreModal, {
  RefFunctions as ModalRef,
} from "../../modal_components/inventory_item_list_more"
import Icon from "../../components/icon"
import { ProductsData } from "../../database_hooks"

import InventoryItemListScreen from "../../screens/inventory_item_list"
import InventoryItemViewScreen from "../../screens/inventory_item_view"
import InventoryItemUpsertScreen from "../../screens/inventory_item_upsert"

const StackNav = createStackNavigator()

const NormalScreenTransition = TransitionPresets.SlideFromRightIOS
const FormScreenTransition = TransitionPresets.RevealFromBottomAndroid

const ItemUpsertHeaderTitle: React.FC<StackHeaderTitleProps> = ({
  tintColor,
}) => {
  const { params } = useRoute()
  if (params) {
    return <HeaderTitle style={{ color: tintColor }}>Edit Product</HeaderTitle>
  }

  return <HeaderTitle style={{ color: tintColor }}>New Product</HeaderTitle>
}

const ItemViewHeaderRight: React.FC<{
  tintColor?: string | undefined
}> = ({ tintColor }) => {
  const { params } = useRoute()
  const { navigate, goBack } = useNavigation()
  const modalRef = useRef<ModalRef>(null)

  const _handleOpenModal = useCallback(() => {
    if (modalRef.current?.openModal) {
      modalRef.current.openModal(params as ProductsData)
    }
  }, [])

  if (!params) return null

  return (
    <>
      <TouchableOpacity onPress={_handleOpenModal}>
        <View style={styles.headerIcon}>
          <Icon color={tintColor} name="more-vert" size={23} />
        </View>
      </TouchableOpacity>

      <InventoryItemMoreModal
        ref={modalRef}
        navigateTo={navigate}
        goBack={goBack}
      />
    </>
  )
}

const ItemListOptions: StackNavigationOptions = {
  headerTitle: "Inventory",
}

const ItemViewOptions: StackNavigationOptions = {
  headerTitle: "Product",
  headerRight: ItemViewHeaderRight,
  ...NormalScreenTransition,
}

const ItemUpsertOptions: StackNavigationOptions = {
  headerTitle: ItemUpsertHeaderTitle,
  ...FormScreenTransition,
}

const InventoryNavigator = () => {
  return (
    <StackNav.Navigator
      initialRouteName={NavScreens.inventoryItemList}
      screenOptions={{
        headerStyle: styles.header,
        headerTitleAlign: "center",
      }}
    >
      <StackNav.Screen
        name={NavScreens.inventoryItemList}
        options={ItemListOptions}
        component={InventoryItemListScreen}
      />
      <StackNav.Screen
        name={NavScreens.inventoryItemView}
        options={ItemViewOptions}
        component={InventoryItemViewScreen}
      />
      <StackNav.Screen
        name={NavScreens.inventoryItemUpsert}
        options={ItemUpsertOptions}
        component={InventoryItemUpsertScreen}
      />
    </StackNav.Navigator>
  )
}

const styles = StyleSheet.create({
  header: {
    elevation: 0,
  },
  headerIcon: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 5,
  },
})

export default InventoryNavigator
