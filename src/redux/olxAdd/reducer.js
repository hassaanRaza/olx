const INITIAL_STATE = {
    ads : [],
    showLoader: false
}

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case "UPDATE_ADS":{
            return {...state, ads: action.data};
        }
        case "SEARCHWITHTITLE_ADS":{
            return {...state, ads: action.data};
        }
        case "FILTERBYCATEGORY_ADS":{
            return {...state, ads: action.data};
        }
        case "SORTBYORDER_ADS":{
            return {...state, ads: action.data};
        }
        default:{
            return state;
        }
    }
}

export default reducer;