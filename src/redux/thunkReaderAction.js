import axios from "axios";
import {url} from "./thunkBookAction";
import {createReaderAction, deleteReaderAction, setReadersAction, updateReaderAction} from "./reducers/readerReducer";
import {cleanErrorAction, setErrorAction} from "./reducers/errorReducer";

export const getReaders = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${url}/api/readers/all`)
            dispatch(setReadersAction(response.data))
        } catch (e) {
            dispatch(setErrorAction(e.response.data.message))

            setTimeout(() => {
                dispatch(cleanErrorAction())
            }, 4000)
        }
    }
}

export const deleteReader = (id) => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${url}/api/readers/delete/${id}`)
            console.log(response)
            dispatch(deleteReaderAction(id))
        } catch (e) {
            dispatch(setErrorAction(e.response.data.message))

            setTimeout(() => {
                dispatch(cleanErrorAction())
            }, 4000)
        }
    }
}

export const createReader = (reader) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${url}/api/readers/create`, reader)
            console.log(response)
            dispatch(createReaderAction(reader))
        } catch (e) {
            dispatch(setErrorAction(e.response.data.message))

            setTimeout(() => {
                dispatch(cleanErrorAction())
            }, 4000)
        }
    }
}

export const updateReader = (id, reader) => {
    return async dispatch => {
        try {
            const response = await axios.put(`${url}/api/readers/update/${id}`, reader)
            console.log(response)
            updateReaderAction(response.data.reader)
        } catch (e) {
            dispatch(setErrorAction(e.response.data.message))

            setTimeout(() => {
                dispatch(cleanErrorAction())
            }, 4000)
        }
    }
}