import { createAppContainer} from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'
import Home from "./Home";
import QRCodeScannerScreen from "./QRCodeScannerScreen";
import OrderPicker from "./OrderPicker";
import LoadingAttendant from "./LoadingAttendant";
import Trucker from "./Trucker";
import Info from "./Info";
import v1 from "./v1";
import ProductInfo from "./Product_info";

const mainStack = createStackNavigator(
    {
        Home: Home,
        OrderPicker: OrderPicker,
        QRCodeScannerScreen: QRCodeScannerScreen,
        LoadingAttendant: LoadingAttendant,
        Trucker: Trucker,
        Info: Info,
        ProductInfo: ProductInfo,

    },
    {
        defaultNavigationOptions: {
        headerShown: false
    }
    }
    
);

const AppContainer = createAppContainer(mainStack);
export default AppContainer;