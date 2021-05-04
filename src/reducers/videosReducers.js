const INITIAL_STATE = {
    videoList: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "VIDEO_LIST":
            return {...state, videoList: action.payload}
        case "VIDEO_SELECTED":
            return {...state, videoSelected: action.payload}
        default:
            return state
    }
}