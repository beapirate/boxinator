import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers/index.js'
import { reloadBoxesFromApi, saveBoxToApi } from './actions.js';

const store = createStore(rootReducer, applyMiddleware(thunk))

store.dispatch(reloadBoxesFromApi());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

