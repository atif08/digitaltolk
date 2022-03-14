/**
 * Created by Atif on 7/11/2019.
 */
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';







const instance = axios.create({

    baseURL: `https://todo.ua815598.serversignin.com/api`,
    // baseURL: `https://todo-test.digitaltolk.com/api`,
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Accept: 'application/json',
    },


});
export default instance;
