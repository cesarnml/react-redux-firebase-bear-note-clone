import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import * as serviceWorker from './serviceWorker'

import App from './App'
import rootReducer from './store/reducers'

import './css/index.css'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(thunk))
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route render={props => <App {...props} />} />
    </Router>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.register()
