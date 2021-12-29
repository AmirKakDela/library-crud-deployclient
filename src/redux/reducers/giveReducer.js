
const initialState = {
    gives: []
}

const givesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GIVES:
            return {
                ...state, gives: action.payload
            }
        case DELETE_GIVE:
            return {
                ...state, gives: [...state.gives].filter(give => give._id !== action.payload)
            }
        case CREATE_GIVE:
            return {
                ...state, give: [...state.gives, action.payload]
            }
        default:
            return state
    }
}

export default givesReducer



const SET_GIVES = 'SET_GIVES'
const DELETE_GIVE = 'DELETE_GIVE'
const CREATE_GIVE = 'CREATE_GIVE'

export const setGivesAction = (gives) => {
    return {
        type: SET_GIVES,
        payload: gives
    }
}

export const deleteGiveAction = (id) => {
    return {
        type: DELETE_GIVE,
        payload: id
    }
}

export const createGiveAction = (give) => {
    return {
        type: CREATE_GIVE,
        payload: give
    }
}

