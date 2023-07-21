
function UIReducer (state, action) {
    switch (action.type) {
        case "CHANGE_SCREEN":
            return {...state, screen: action.payload}
        case "CONTROL_MODAL":
            return {...state, showModal: action.payload}
        default:
            return state
    }
}

export default UIReducer 