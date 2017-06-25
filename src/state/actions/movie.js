import { httpRequest } from '../../http'

export const MOVIE_REQUEST = 'movie/REQUEST'
export const MOVIE_SUCCESS = 'movie/SUCCESS'
export const MOVIE_ERROR = 'movie/ERROR'

export const MOVIE_CHANGE = 'movie/CHANGE'


export function startRequest() {
    return {
        type: MOVIE_REQUEST,
        payload: {},
    }
}

export function requestSuccess(data) {
    return {
        type: MOVIE_SUCCESS,
        payload: {
            data,
        },
    }
}
export function requestError() {
    return {
        type: MOVIE_ERROR,
        payload: {},
    }
}

export function requestMovie() {
    return (dispatch, getState) => {
        const {
            movie: { loading },
        } = getState()

        if (loading) return new Promise(resolve => resolve())

        dispatch(startRequest())
        return httpRequest('/movie')
            .then(resp => dispatch(requestSuccess(resp)))
            .catch(e => {
                dispatch(requestError())
                return Promise.reject(e)
            })
    }
}
