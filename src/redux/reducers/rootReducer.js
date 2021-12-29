import {combineReducers} from "redux";
import bookReducer from "./bookReducer";
import readerReducer from "./readerReducer";
import errorReducer from "./errorReducer";
import giveReducer from "./giveReducer";


export const rootReducer = combineReducers({
    books: bookReducer,
    readers: readerReducer,
    gives: giveReducer,
    error: errorReducer
})

