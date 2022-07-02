import {
    GET_USERCART,
    GET_CHECKOUT,
    GET_COMMENT,
    GET_CATEGORY
    , GET_ALLVENDORS,
    GET_MYORDER,
    GET_SINGLESHOP,
    GET_CATEGORYPRODUCT,
    GET_ALLORDERS,
    GET_DETAILSMYORDER
} from "../actions/product";





const initialState = {

    phone: null,

}




export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USERCART:
            return { ...state, data: action.data };
        case GET_CHECKOUT:
            return { ...state, data: action.data };
        case GET_COMMENT:
            return { ...state, data: action.data };
        case GET_CATEGORY:
            return { ...state, data: action.data };
        case GET_ALLVENDORS:
            return { ...state, data: action.data };
        case GET_MYORDER:
            return { ...state, data: action.data };
        case GET_DETAILSMYORDER:
            return { ...state, data: action.data };
        case GET_SINGLESHOP:
            return { ...state, data: action.data };
        case GET_CATEGORYPRODUCT:
            return { ...state, data: action.data };
        case GET_ALLORDERS:
            return { ...state, data: action.data };

        default:
            return state;
    }
}
