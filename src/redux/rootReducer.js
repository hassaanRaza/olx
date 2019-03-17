import userReducer from './user/reducer';
import adsReducer from './olxAdd/reducer';
import chatReducer from './chat/reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    userReducer,
    adsReducer,
    chatReducer
});

export default rootReducer;