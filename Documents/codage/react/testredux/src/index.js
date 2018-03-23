import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { createStore} from 'redux';

import reducers from './reducers'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'


const state = {

	
	comments : {},
	
	
	posts : {},
	
	
	categories : {},
	
		
}



const store = createStore(reducers, state, )


ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker()
