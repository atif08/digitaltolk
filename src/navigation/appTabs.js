import {Icon} from 'native-base';
import React, {Component} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';
import {base} from '../constants';
import Profile from '../screens/Profile/Profile';
import TaskScreen from '../screens/task_screen/TaskScreen';
import CheckIns from '../screens/checkins/CheckIns';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';


const Tab = createBottomTabNavigator();
const SettingsStack = createStackNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


export function DrawerShop() {
    return (<Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={SettingsScreen}/>
    </Drawer.Navigator>);
}
export default function TabNavigation({navigation, route}) {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    return (<Icon style={[{color: color}, styles.tabIconStyle]} name='ios-medal'/>);
                },
            })}
            tabBarOptions={{
                style: styles.tabStyle,
                activeTintColor: base.secondColor,
                inactiveTintColor: 'grey',
            }}
            initialRouteName={'Home'}>
            <Tab.Screen name="Tasks">
                {() => (
                    <SettingsStack.Navigator>
                        <SettingsStack.Screen
                            name="Tasks"
                            component={TaskScreen}
                        />
                    </SettingsStack.Navigator>
                )}
            </Tab.Screen>
            <Tab.Screen name="CheckIns">
                {() => (
                    <SettingsStack.Navigator>
                        <SettingsStack.Screen
                            name="CheckIns"
                            component={CheckIns}
                        />
                    </SettingsStack.Navigator>
                )}
            </Tab.Screen>
            <Tab.Screen name="Profile">
                {() => (
                    <Stack.Navigator>
                        <Stack.Screen options={{title:'',headerTransparent: true}} name="Profile" component={Profile}/>
                    </Stack.Navigator>
                )}
            </Tab.Screen>
        </Tab.Navigator>
    );
}
const styles = StyleSheet.create({
    tabStyle: {
        height: Platform.OS === 'ios' ? responsiveScreenHeight(10) : responsiveScreenHeight(8),
        paddingBottom: Platform.OS === 'ios' ? 30 : 10,
    },
    tabIconStyle: {
        textAlign: 'center',
        fontSize: 25,
        borderRadius: 60,
    },

});
