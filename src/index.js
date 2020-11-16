import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './wdyr';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './store/reducers/authReducer';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './firebase';

// const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose
const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });
const rootReducer = combineReducers({
	auth: authReducer,
});
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

const app = (
	<FirebaseContext.Provider value={new Firebase()}>
		<Provider store={store}>
			<BrowserRouter>
				<Suspense fallback={<div>Loading...</div>}>
					<App />
				</Suspense>
			</BrowserRouter>
		</Provider>
	</FirebaseContext.Provider>
);

ReactDOM.render(
	<React.StrictMode>{app}</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
