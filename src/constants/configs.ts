import * as Device from "expo-device";

import { Dimensions } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const currentYear = new Date().getFullYear();
const deviceYear = Device.deviceYearClass || currentYear;

const isNewPhoneModel = deviceYear - currentYear <= 2;
const isTallDevice = deviceHeight > 750;

const configs = {
  numRows: isTallDevice ? 12 : 10,
  throttleMs: isNewPhoneModel ? 500 : 1000,
};

export default configs;
