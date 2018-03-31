import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware, compose } from 'redux'

import reducers from './reducers'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';



const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}





const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose



const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(logger, thunk )
  )
)




ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker()
