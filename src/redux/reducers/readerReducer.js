
const initialState = {
    readers: []
}

const readerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_READERS:
            return {
                ...state, readers: action.payload
            }
        case DELETE_READER:
            return {
                ...state, readers: [...state.readers].filter(reader => reader._id !== action.payload)
            }
        case CREATE_READER:
            return {
                ...state, readers: [...state.readers, action.payload]
            }
        case UPDATE_READER:
            return {
                ...state, readers: [...state.readers].map(reader => {
                    if(reader._id === action.payload._id) {
                        reader = {...action.payload}
                    }
                    return reader
                })
            }
        default:
            return state
    }
}

export default  readerReducer

const SET_READERS = 'SET_READERS'
const DELETE_READER = 'DELETE_READER'
const CREATE_READER = 'CREATE_READER'
const UPDATE_READER = 'UPDATE_READER'

export const setReadersAction = (readers) => {
    return {
        type: SET_READERS,
        payload: readers
    }
}

export const deleteReaderAction = (id) => {
    return {
        type: DELETE_READER,
        payload: id
    }
}

export const createReaderAction = (reader) => {
    return {
        type: CREATE_READER,
        payload: reader
    }
}

export const updateReaderAction = (reader) => {
    return {
        type: UPDATE_READER,
        payload: reader
    }
}