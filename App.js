import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Root} from 'native-base';
import {Linking, StyleSheet} from 'react-native';
import Splash from './src/screens/auth/Splash.js';
const Stack = createStackNavigator();
import {connect} from 'react-redux';
import configureStore from './src/store/ConfigureStore';
import {authAutoSignIn} from './src/store/actions/auth';
import {AfterLogin, BeforLogin} from './src/navigation/routes';
import {base} from './src/constants';
const store = configureStore();
import messaging from '@react-native-firebase/messaging';
import { LogBox } from 'react-native';
const navigationRef = React.createRef();
const deepLinksConf = {
    screens: {
        Signup: 'signup',
        Login: 'login',
        ChatScreen: 'chat/:fixture_team_id/:name',
        Terms: 'Terms',
        Profile: 'Profile',
        HomeTabs: {
            initialRouteName: 'Home',
            screens: {
                Profile: 'profile',
                Chat: 'chatgroups',
            },
        },
    },
};


// const linking: LinkingOptions = {
//     prefixes: ['crikclub://', 'https://app.crikclub.com'],
//     config: deepLinksConf,
//     async getInitialURL() {
//         // Check if app was opened from a deep link
//         const url = await Linking.getInitialURL();
//
//         if (url != null) {
//             return url;
//         }
//
//         // Check if there is an initial firebase notification
//         const message = await messaging().getInitialNotification();
//
//         // Get deep link from data
//         // if this is undefined, the app will open the default/home page
//         return message?.data?.link;
//     }
// }
const linking: LinkingOptions = {
    prefixes: ['crikclub://', 'https://app.crikclub.com'],
    config: deepLinksConf,
    async getInitialURL() {
        // Check if app was opened from a deep link
        const url = await Linking.getInitialURL();
        if (url != null) {
            return url;
        }
        // Check if there is an initial firebase notification
        const message = await messaging().getInitialNotification();
        // Get deep link from data
        // if this is undefined, the app will open the default/home page
        return message?.data?.link;
    },
    subscribe(listener) {
        const onReceiveURL = ({url}: { url: any }) => listener(url);
        // Listen to incoming links from deep linking
        Linking.addEventListener('url', onReceiveURL);
        // Listen to firebase push notifications when app is in dead state or closed
        const unsubscribe = messaging().getInitialNotification().then((msg: FirebaseMessagingTypes.RemoteMessage) => {
            const url = msg?.data?.link;
            if (url) {
                listener(url);
            }
        });
        // Listen to firebase push notifications when app is background
        const unsubscribeNotification = messaging().onNotificationOpenedApp(
            (message) => {
                const url = message?.data?.link;
                if (url) {
                    listener(url);
                }
            },
        );
        // Listen to firebase push notifications when app is foregorund
        const unsubscribeForeground = messaging().onMessage(
            (message) => {
                const url = message?.data?.link;
            },
        );
        return () => {
            // Clean up the event listeners
            Linking.removeEventListener('url', onReceiveURL);
            unsubscribeNotification();
        };
    },
};

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {timePassed: true,tabBarBadge:0};
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({timePassed: false});
        }, 1000);
        this.props.onAutoSignIn();
        const unsubscribe = messaging().getInitialNotification().then((msg: FirebaseMessagingTypes.RemoteMessage) => {
            // console.warn('Message handled in the background!', msg);
        });
        messaging().onMessage(remoteMessage => {
            this.setState({tabBarBadge:this.state.tabBarBadge+1})
         });
        messaging().onNotificationOpenedApp(async remoteMessage => {
            // console.warn('Message handled in the background!', remoteMessage);
        });
    };

    render() {
        // console.warn(this.props.user.token.token);
        return (
            <Root>
                <NavigationContainer linking={linking} fallback={<Splash/>}>
                {this.state.timePassed === true ? (
                    <Stack.Navigator screenOptions={{...TransitionPresets.SlideFromRightIOS}}>
                        <Stack.Screen options={{headerShown: false}} name="Splash" component={Splash}/>
                    </Stack.Navigator>
                ) : (this.props.user.token == null) ? (
                    // No token found, user isn't signed in
                    <Stack.Navigator screenOptions={{...TransitionPresets.SlideFromRightIOS,headerBackTitleVisible: false,
                        headerTransparent: true, ...TransitionPresets.SlideFromRightIOS}}>
                        {BeforLogin()}
                    </Stack.Navigator>
                ) : (
                        <Stack.Navigator screenOptions={{
                            headerTintColor: base.mainColor,
                            headerBackTitleVisible: false,
                            headerTransparent: true,
                            ...TransitionPresets.SlideFromRightIOS,
                        }}>
                            {AfterLogin(this.props.user)}
                        </Stack.Navigator>

                )}
                </NavigationContainer>
            </Root>
        );
    }
}

LogBox.ignoreLogs(['Setting a timer']);

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        user: state.auth,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAutoSignIn: () => dispatch(authAutoSignIn()),
    };
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        borderWidth: 1,
        borderColor: '#000000',
        margin: 5,
        padding: 5,
        width: '70%',
        backgroundColor: '#DDDDDD',
        borderRadius: 5,
    },
    textField: {
        borderWidth: 1,
        borderColor: '#AAAAAA',
        margin: 5,
        padding: 5,
        width: '70%',
    },
    spacer: {
        height: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
