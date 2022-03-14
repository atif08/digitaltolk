import {
    UI_HIDE_MODAL, UI_HIDE_MODAL_ACTIVITY, UI_HIDE_MODAL_HOTEL, UI_SHOW_MODAL, UI_SHOW_MODAL_ACTIVITY,
    UI_SHOW_MODAL_HOTEL, UI_START_LOADING,
    UI_STOP_LOADING
} from "../actions/actionTypes";

const initialState = {
    isLoading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UI_START_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case UI_STOP_LOADING:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
};

export default reducer;
