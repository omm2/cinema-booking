import thunk from 'redux-thunk'

import logger from './logger'

const middlewares = [
    thunk,
    logger,
]

export default middlewares
