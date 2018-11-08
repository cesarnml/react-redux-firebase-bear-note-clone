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

const onDragEnd = result => {
  //* Logic Later
  const { destination, source, dragableId } = result
  if (!destination) {
    return
  }

  if (
    (destination.droppableId =
      source.droppableId && destination.index === source.index)
  ) {
    return
  }
  const column = this.state.column[source.droppableId]
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route render={props => <App {...props} />} />
    </Router>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()
