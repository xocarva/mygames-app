import { combineReducers } from "redux";

const userReducer = ( state = null, action ) => {
    switch ( action.type ) {
        case 'login':
            return action.user;
        case 'logout':
            return null;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;
