import { createStore } from 'redux'
import app from './reducers'

const store = createStore(app)

export default store
