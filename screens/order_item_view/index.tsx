import React, { useCallback, useEffect } from "react"
import {
  SectionList,
  SectionListRenderItem,
  SectionListData,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"

import { OrdersData } from "../../database_hooks"
import OrderItemViewFieldsSection from "../../sections/order_item_view_fields"
import OrderItemViewActionsSection from "../../sections/order_item_view_actions"

type SectionsStructure =
  | {
      type: "__RENDER_LIST_FIELDS__"
      renderItem: SectionListRenderItem<OrdersData>
    }
  | {
      type: "__RENDER_LIST_ACTIONS__"
      renderItem: SectionListRenderItem<OrdersData>
    }
  | {
      type: "__RENDER_LIST_ITEMS__"
    }

interface Props extends StackScreenProps<any> {}

const OrderItemViewScreen: React.FC<Props> = ({ navigation, route }) => {
  const RenderItem: SectionListRenderItem<any> = useCallback(() => {
    return null
  }, [])

  const FieldsData = route.params as OrdersData

  const Sections: Array<SectionListData<any, SectionsStructure>> = [
    {
      type: "__RENDER_LIST_FIELDS__",
      key: "__RENDER_LIST_FIELDS__",
      data: [FieldsData],
      renderItem: OrderItemViewFieldsSection,
    },
    {
      type: "__RENDER_LIST_ACTIONS__",
      key: "__RENDER_LIST_ACTIONS__",
      data: [{}],
      renderItem: OrderItemViewActionsSection,
    },
    {
      type: "__RENDER_LIST_ITEMS__",
      key: "__RENDER_LIST_ITEMS__",
      data: [],
      renderItem: () => null,
    },
  ]

  return <SectionList sections={Sections} />
}

export default OrderItemViewScreen
