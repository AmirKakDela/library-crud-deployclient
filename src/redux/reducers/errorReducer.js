const initialState = {
    error: null
}

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR:
            return {...state, error: action.payload}
        case CLEAN_ERROR:
            return {...state, error: null}
        default:
            return state
    }
}

export default errorReducer

const SET_ERROR = 'SET_ERROR'
const CLEAN_ERROR = 'CLEAN_ERROR'

export const setErrorAction = (error) => {
    return {
        type: SET_ERROR,
        payload: error
    }
}

export const cleanErrorAction = () => {
    return {
        type: CLEAN_ERROR,
    }
}
