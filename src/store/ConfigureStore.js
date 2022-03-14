/**
 * Created by Atif on 8/27/2019.
 */
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import authReducer from './reducers/auth';
import uiReducer from './reducers/ui';

import thunk from 'redux-thunk';
const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
});
let composeEnhancers = compose;
if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};
export default configureStore;
