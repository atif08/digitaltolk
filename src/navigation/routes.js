import Login from '../screens/auth/Login';
import {createStackNavigator} from '@react-navigation/stack';
import Terms from '../screens/terms/Terms';
import React from 'react';
import TabNavigation from './appTabs';
import AddTaskScreen from '../screens/task_screen/AddTaskScreen';
const Stack = createStackNavigator();
export  function BeforLogin() {
    return (
        <>
            <Stack.Screen name="SignIn" component={Login} options={{title: ''}}/>
            <Stack.Screen name="Terms" component={Terms} options={{title: ''}}/>
        </>
    );
}
export function AfterLogin(props) {
    const {userData}  = props ;
    return (
        <>
            <Stack.Screen name="HomeTabs" component={TabNavigation}  initialParams={userData} options={{headerShown: false}}/>
            <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} options={{
                title: '',
            }}/>
        </>
    );
}

