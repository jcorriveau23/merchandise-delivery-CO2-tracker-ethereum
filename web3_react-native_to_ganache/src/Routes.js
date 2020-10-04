import { createAppContainer} from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'
import Home from "./Home";
import QRCodeScannerScreen from "./QRCodeScannerScreen";
import OrderPicker from "./OrderPicker";
import LoadingAttendant from "./LoadingAttendant";
import Trucker from "./Trucker";
import v1 from "./v1";

const mainStack = createStackNavigator(
    {
        Home: Home,
        OrderPicker: OrderPicker,
        QRCodeScannerScreen: QRCodeScannerScreen,
        LoadingAttendant: LoadingAttendant,
        Trucker: Trucker,
        v1: v1
    },
);

const AppContainer = createAppContainer(mainStack);
export default AppContainer;