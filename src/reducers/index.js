import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import videosReducer from "./videosReducers"
import contractEventsReducer from "./contractEventReducer"

export default combineReducers({
    videos: videosReducer,
    form: formReducer,
    contractEvent: contractEventsReducer
})