import {TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN} 
from "../actions/actionTypes";
const initialState = {
    id: null,
    first_name: null,
    last_name:null,
    photo: null,
    token: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SET_TOKEN:
            return {
                ...state,
                ...action.payload,
            };
        case AUTH_REMOVE_TOKEN:
            return {
                ...state,
                id: null,
                first_name: null,
                last_name: null,
                photo: null,
                token: null,
            };
        default:
            return state;
    }
};

export default reducer;
