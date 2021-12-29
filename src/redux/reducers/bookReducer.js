const initialState = {
    books: []
}

const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BOOKS:
            return {
                ...state, books: action.payload
            }
        case CREATE_BOOK:
            return {
                ...state, books: [...state.books, action.payload]
            }
        case DELETE_BOOK:
            return {
                ...state, books: [...state.books].filter(book => book._id !== action.payload)
            }
        case UPDATE__BOOK:
            return {
                ...state, books: [...state.books].map(book => {
                    if(book._id === action.payload._id) {
                        console.log(book)
                        console.log(action.payload)
                        book = {...action.payload}
                    }
                    return book
                })
            }
        default:
            return state
    }
}

export default bookReducer;

const SET_BOOKS = 'SET_BOOKS'
const CREATE_BOOK = 'CREATE_BOOK'
const DELETE_BOOK = 'DELETE_BOOK'
const UPDATE__BOOK = 'UPDATE__BOOK'

export const setBooksAction = (books) => {
    return {
        type: SET_BOOKS,
        payload: books
    }
}

export const createBookAction = (book) => {
    return {
        type: CREATE_BOOK,
        payload: book
    }
}

export const deleteBookAction = (id) => {
    return {
        type: DELETE_BOOK,
        payload: id
    }
}

export const updateBookAction = (book) => {
    return {
        type: UPDATE__BOOK,
        payload: book
    }
}