const INITIAL_STATE = {
    roomInfo : [],
}

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case "UPDATE_ROOM":{
            return {...state, roomInfo: action.data};
        }
        default:{
            return state;
        }
    }
}

export default reducer;