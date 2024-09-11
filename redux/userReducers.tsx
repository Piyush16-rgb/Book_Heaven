import { SET_USER_EMAIL } from "./userActions";

const initialState = {
    email: '',
};

const userReducer = (state = initialState, action: any) => {
    switch(action.type){
        case SET_USER_EMAIL:
            return {
                ...state,
                email: action.payload,
            };
            default:
                return state;
    }
};

export default userReducer;