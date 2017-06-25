import { httpRequest } from '../../http'

export const HALL_REQUEST = 'hall/REQUEST'
export const HALL_SUCCESS = 'hall/SUCCESS'
export const HALL_ERROR = 'hall/ERROR'

export function startRequest() {
    return {
        type: HALL_REQUEST,
        payload: {},
    }
}

export function requestSuccess(data) {
    return {
        type: HALL_SUCCESS,
        payload: {
            data,
        },
    }
}
export function requestError() {
    return {
        type: HALL_ERROR,
        payload: {},
    }
}

export function requestHall() {
    return (dispatch, getState) => {
        const {
            hall: { loading },
        } = getState()

        if (loading) return new Promise(resolve => resolve())

        dispatch(startRequest())
        return httpRequest('/hall')
            .then(resp => dispatch(requestSuccess(resp)))
            .catch(e => {
                dispatch(requestError())
                return Promise.reject(e)
            })
    }
}
