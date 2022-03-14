import {uiStartLoading, uiStopLoading} from './ui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {App} from '../../../App';
import {AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN} from './actionTypes';
import  axios from '../../helper/axios';
import * as qs from 'qs';
import {Platform} from 'react-native';
export const tryAuth = (authData) => {
    return (dispatch) => {
        dispatch(uiStartLoading());
        let requestOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        };
        let body = {
            email: authData.email,
            password: authData.password,
            fcm_token:authData.fcm_token,
            device_name:Platform.OS
        };
        axios
            .post('login', qs.stringify(body))
            .then((response) => {
                dispatch(uiStopLoading());
                if (response.data.token !=null) {
                    dispatch(authStoreToken(response));
                    {
                        App;
                    }
                } else {
                    dispatch(uiStopLoading());
                }
            })
            .catch((err) => {
                dispatch(uiStopLoading());
            });
    };
};
export const authGetToken = () => {
    return (dispatch, getState) => {
      const promise = new Promise((resolve, reject) => {
        const token = getState().auth.token;
        if (!token) {
          let fetchedToken;
          let fetchUsername;
          AsyncStorage.getItem('ap:auth:token')
              .catch((err) => reject())
              .then((tokenFromStorage) => {
                fetchedToken = tokenFromStorage;
                if (!tokenFromStorage) {
                  reject();
                  return;
                }
                return AsyncStorage.getItem('ap:auth:token');
              })
              .then((userId) => {
                dispatch(
                    authSetTokenAuto(fetchedToken),
                );
                resolve(fetchedToken);
              })
              .catch((err) => reject());
        } else {
          resolve(token);
        }
      });
      return promise;
    };
  };
  
export const authStoreToken = (response) => {
    return (dispatch) => {
        dispatch(authSetToken({...response}));
        AsyncStorage.setItem('ap:auth:token', response.data.token);
    }
}
export const authAutoSignIn = () => {
    // AsyncStorage.removeItem('ap:auth:token');
    return (dispatch) => {
        // dispatch(uiStartLoading());
        dispatch(authGetToken()).then((token) => {
                // dispatch(uiStopLoading());
                {
                    App;
                }
            })
            .catch((err) => {
                {
                    App;
                }
            });
    }
}


export const authSetToken = (data) => {
    return {
        type: AUTH_SET_TOKEN,
        payload: {  id: null,
            first_name: null,
            last_name:null,
            photo: null,
            token: data.data.token},
    };
}
export const authSetTokenAuto = (token) => {
    return {
        type: AUTH_SET_TOKEN,
        payload: {token:token},
    };
}


export const authClearStorage = () => {
    return (dispatch) => {
        AsyncStorage.removeItem('ap:auth:id');
        AsyncStorage.removeItem('ap:auth:first_name');
        AsyncStorage.removeItem("ap:auth:photo");
        return AsyncStorage.removeItem('ap:auth:token');
    };
};


export const authLogout = () => {
    return (dispatch) => {
        dispatch(authClearStorage()).then(() => {
            // App;
        });
        dispatch(authRemoveToken());
    };
};
export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN,
    };
};
