
import React from 'react';
import { createStore,applyMiddleware,combineReducers} from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers/index';
import thunk from 'redux-thunk'
import Navigator from './Navigator';

const middlewares = [thunk];

const store = createStore(
    combineReducers({...rootReducer}),
    composeWithDevTools(applyMiddleware(...middlewares))
);

const Root = () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);

export default Root;
