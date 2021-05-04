import { Dimensions, StatusBar } from "react-native"

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default {
  window: {
    width,
    height,
  },
  /**
   * NOTE:
   *
   * Direct children within sections should use
   * this to add spacing between the screen and
   * component
   */
  statusbar: StatusBar.currentHeight,
  isSmallDevice: width < 375,
}
