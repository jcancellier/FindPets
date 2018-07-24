import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';

let middleware = [ReduxThunk];

//1st argument is list of reducers
//2nd argument is initial state
//3rd argument is middleware (store enhancers)
const store = createStore(reducers, {}, applyMiddleware(...middleware));

export {
    store
}
