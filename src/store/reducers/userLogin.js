import {
    LOGIN,
    CITY,
    GET_ADDRESS,
    GET_ALLADDRESS,
    GET_SELLER,
    SECTOR,
    GET_SEARCH,
    SET_PRO,
    SET_TOKEN,
    GET_WALLET,
    LOGOUT,
    SET_QUN
} from "../actions/userLogin";






const initialState = {

    phone: null,

}




export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, data: action.data };
        case CITY:
            return { ...state, data: action.data };
        case SECTOR:
            return { ...state, data: action.data };
        case GET_ADDRESS:
            return { ...state, dataaddress: action.data };
        case GET_ALLADDRESS:
            return { ...state, data: action.data };
        case GET_SELLER:
            return { ...state, dataseller: action.data };
        case GET_SEARCH:
            return { ...state, data: action.data };
        case SET_PRO:
            return { ...state, datapro: action.data };
        case SET_TOKEN:
            return { ...state, datatoken: action.data };
        case GET_WALLET:
            return { ...state, datawallet: action.data };
        case LOGOUT:
            return initialState;
        case SET_QUN:
            return { ...state, dataQun: action.data };
            
        default:
            return state;
    }
}
