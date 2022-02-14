import { IDefaultState, IUserAction } from "../../types/userTypes";
import { ADD_NEW_USER, EDIT_SCORE, SET_USERS } from "../actions/userActions";

const defaultState: IDefaultState = {
    users: []
}

export const userReducer = (state = defaultState, action: IUserAction) => {
    switch (action.type) {
        case SET_USERS:
            return {...state, users: [...state.users, ...action.payload]}
        case ADD_NEW_USER:
            return {...state, users: [...state.users, action.payload]};
        case EDIT_SCORE:
            return {...state, users: [...state.users.map(user => {
                if (user.name === action.payload.name) {
                    return action.payload;
                }
                return user
            })]};
        default:
            return state;
    }
}