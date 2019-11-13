import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers/index.js'

const store = createStore(rootReducer, applyMiddleware(thunk))

store.dispatch((dispatch) => {
  return fetch('/api/box', {
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    const isJsonResponse = response.headers.get('content-type') &&
        response.headers.get('content-type').indexOf('application/json') >= 0;

    if(!isJsonResponse) {
        // XXX - this should result in a server-error status to user
        console.error("Expected to receive JSON data from API");
        return;
    }

    return response.json().then(json => {
        if(response.ok) {
            dispatch({type: "LOAD_SUCCESS", response: json})
        }
        else {
            console.error(json);
            dispatch({type: "LOAD_ERROR", response: json});
        }
    })
  });
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

