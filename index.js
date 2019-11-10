import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import newbox from './reducers/index.js'

const store = createStore(newbox)
store.dispatch({"type": "CREATE_NEW_BOX"});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
