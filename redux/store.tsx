import { createStore , combineReducers } from 'redux';
import { cartReducer } from './cartReducers';
import userReducer from './userReducers';

const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

const store = createStore(rootReducer);

export default store;