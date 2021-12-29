import axios from "axios";
import {createBookAction, deleteBookAction, setBooksAction, updateBookAction} from "./reducers/bookReducer";
import {cleanErrorAction, setErrorAction} from "./reducers/errorReducer";


export const url = 'https://library-crud163.herokuapp.com'
export const getBooks = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${url}/api/books/all`)
            dispatch(setBooksAction(response.data))
        } catch (e) {

        }
    }
}

export const createBook = (book) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${url}/api/books/create`, book)
            dispatch(createBookAction(response.data))
        } catch (e) {
            console.log(e.response.data.message)
            dispatch(setErrorAction(e.response.data.message))

            setTimeout(() => {
                dispatch(cleanErrorAction())
            }, 4000)
        }
    }
}

export const deleteBook = (id) => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${url}/api/books/delete/${id}`)
            console.log(response)
            dispatch(deleteBookAction(id))
        } catch (e) {
            dispatch(setErrorAction(e.response.data.message))

            setTimeout(() => {
                dispatch(cleanErrorAction())
            }, 4000)
        }
    }
}

export const updateBook = (id, book) => {
    return async dispatch => {
        try {
            const response = await axios.put(`${url}/api/books/update/${id}`, book)
            console.log(response)
            dispatch(updateBookAction(response.data.updatedBook))
        } catch (e) {
            dispatch(setErrorAction(e.response.data.message))

            setTimeout(() => {
                dispatch(cleanErrorAction())
            }, 4000)
        }
    }
}