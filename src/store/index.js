import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['filters', 'user', 'favorites']
}

const persistedReducer = persistReducer(persistConfig, reducers);

let middleware = [ReduxThunk];

//1st argument is list of reducers
//2nd argument is initial state
//3rd argument is middleware (store enhancers)
const store = createStore(persistedReducer, {}, applyMiddleware(...middleware));

const persistor = persistStore(store);

export { store, persistor };
