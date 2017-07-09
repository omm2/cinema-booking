import {
    HALL_REQUEST,
    HALL_SUCCESS,
    HALL_ERROR,
} from '../actions/hall'

const initialState = {
    loading: false,
    rows: [],
    movie: {},
}

export default function hall(state = initialState, action = {}) {
    switch (action.type) {
    case HALL_REQUEST:
        return {
            ...state,
            loading: true,
            errorMessage: '',
        }
    case HALL_SUCCESS:
        return {
            ...state,
            loading: false,
            rows: action.payload.data.rows,
            movie: action.payload.data.movie,
        }
    case HALL_ERROR:
        return {
            ...state,
            loading: false,
            errorMessage: action.payload.errorMessage,
        }
    default:
        return state
    }
}
