import { IDefaultState, IUserAction } from "../../types/userTypes";
import { ADD_NEW_USER, EDIT_SCORE } from "../actions/userActions";


const defaultState: IDefaultState = {
    users: [{
        name: 'Bob',
        score: 5,
    },
    {
        name: 'Elen',
        score: 3
    },
    {
        name: 'Pavel',
        score: 15
    },
    {
        name: 'Jon',
        score: 8,
    },
    {
        name: 'Artem',
        score: 4
    },
    {
        name: 'Stiven',
        score: 11
    }
]
}

export const userReducer = (state = defaultState, action: IUserAction) => {
    switch (action.type) {
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