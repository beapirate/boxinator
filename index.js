import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import boxes from './reducers/boxes'

const store = createStore(boxes)
store.dispatch({"type": "CREATE_NEW_BOX"});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
