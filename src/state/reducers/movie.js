import {
    MOVIE_REQUEST,
    MOVIE_SUCCESS,
    MOVIE_ERROR,
} from '../actions/movie'

const initialState = {
    loading: false,
    data: {
        id: 1,
        title: '',
        poster: '',
        year: 0,
        duration: 0,
        genres: [],
        certificate: '',
        description: '',
        today: [],
    },
}

export default function movie(state = initialState, action = {}) {
    switch (action.type) {
    case MOVIE_REQUEST:
        return {
            ...state,
            loading: true,
            errorMessage: '',
        }
    case MOVIE_SUCCESS:
        return {
            ...state,
            loading: false,
            data: action.payload.data,
        }
    case MOVIE_ERROR:
        return {
            ...state,
            loading: false,
            errorMessage: action.payload.errorMessage,
        }
    default:
        return state
    }
}
