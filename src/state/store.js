import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import middlewares from './middlewares'
import reducer from './reducers'

export const initialData = {}
export default createStore(reducer, initialData, composeWithDevTools(applyMiddleware(...middlewares)))
