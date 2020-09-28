import { createAppContainer} from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'
import Home from "./Home";
import QRCodeScannerScreen from "./QRCodeScannerScreen";
import OrderPicker from "./OrderPicker";
import v1 from "./v1";

const mainStack = createStackNavigator(
    {
        Home: Home,
        OrderPicker: OrderPicker,
        QRCodeScannerScreen: QRCodeScannerScreen,
        v1: v1
    },
);

const AppContainer = createAppContainer(mainStack);
export default AppContainer;