import { combineReducers } from 'redux'

import movie from './movie'
import hall from './hall'

export const reducers = {
    movie,
    hall,
}

export default combineReducers(reducers)
