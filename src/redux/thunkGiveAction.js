import axios from "axios";
import {url} from "./thunkBookAction";
import {cleanErrorAction, setErrorAction} from "./reducers/errorReducer";
import {deleteGiveAction, setGivesAction} from "./reducers/giveReducer";

export const getGives = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${url}/api/gives/all`)
            console.log('getGives', response)
            dispatch(setGivesAction(response.data))
        } catch (e) {
            dispatch(setErrorAction(e.response.data.message))

            setTimeout(() => {
                dispatch(cleanErrorAction())
            }, 4000)
        }
    }
}

export const deleteGive = (id) => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${url}/api/gives/delete/${id}`)
            console.log(response)
            dispatch(deleteGiveAction(id))
        } catch (e) {
            dispatch(setErrorAction(e.response.data.message))

            setTimeout(() => {
                dispatch(cleanErrorAction())
            }, 4000)
        }
    }
}

export const createGive = (give) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${url}/api/gives/create/`, give)
            console.log('createGive', response)
            setTimeout(() => {
                dispatch(getGives());
            }, 200)

        } catch (e) {
            dispatch(setErrorAction(e.response.data.message))

            setTimeout(() => {
                dispatch(cleanErrorAction())
            }, 4000)
        }
    }
}