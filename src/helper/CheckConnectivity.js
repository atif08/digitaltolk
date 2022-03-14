/**
 * Created by Mannan on 10/1/2019.
 */
import {View, Text, Button, Alert, Platform} from "react-native";
import NetInfo from "@react-native-community/netinfo";


export function isConnectivity() {

    const unsubscribe = NetInfo.addEventListener(state => {
        console.warn("Connection type", state.type);
        console.warn("Is connected?", state.isConnected);
    });


    // For Android devices
    // if (Platform.OS === "android") {
    //
    //     NetInfo.isConnected.fetch().then(isConnected => {
    //         // alert(isConnected)
    //         return isConnected;
    //     });
    // } else {
    //     // For iOS devices
    //     NetInfo.isConnected.addEventListener(
    //         "connectionChange",
    //         handleFirstConnectivityChange()
    //     );
    // }
};

export let handleFirstConnectivityChange = isConnected => {
    NetInfo.isConnected.removeEventListener(
        "connectionChange",
        handleFirstConnectivityChange
    );

    return isConnected
};

