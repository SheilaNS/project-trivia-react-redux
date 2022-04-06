import { combineReducers } from 'redux';
import player from './player';
import quiz from './quiz';
import token from './token';

const rootReducer = combineReducers({ token, player, quiz });

export default rootReducer;
