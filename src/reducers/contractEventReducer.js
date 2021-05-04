export default (state = [], action) => {
    switch (action.type) {
        case "CONTRACT_EVENTS":
            return action.payload
        default:
            return state
    }
}