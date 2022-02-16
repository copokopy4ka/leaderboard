import { IDefaultState, IUserAction } from "../../types/userTypes";
import { ADD_NEW_USER,
        EDIT_SCORE,
        RESET_HISTORY,
        SET_USERS,
        SHOW_CURRENT_DAY,
        SHOW_HISTORY_DAY_NEXT,
        SHOW_HISTORY_DAY_PREV
    } from "../actions/userActions";

export const defaultState: IDefaultState = {
    users: [],
    history: [],
    dayIndex: 0,
    isCurrentSaved: false,
}

export const userReducer = (state = defaultState, action: IUserAction) => {
    switch (action.type) {
        case SET_USERS:
            return {...state,
                dayNumber: 0,
                isCurrentSaved: false,
                users: [...action.payload]}
        case ADD_NEW_USER:
            if (state.isCurrentSaved) {
                return {...state,
                    users: [...state.users, action.payload],
                    history: [...state.history.map((users: any[], index: number) => {
                        if (index === state.dayIndex) {
                            return [...users, action.payload]
                        }
                        return users;
                    })]
                }
            }
            return {...state,
                    users: [...state.users, action.payload],
                };
        case EDIT_SCORE:
            if (state.isCurrentSaved) {
                return {...state,
                        users: [...state.users.map(user => {
                            if (user.name === action.payload.name) {
                                return action.payload;
                            }
                            return user
                        })],
                        history: [...state.history.map((users: any[], index: number) => {
                        if (index === state.dayIndex) {
                            return [...users.map(user => {
                                if (user.name === action.payload.name) {
                                    return action.payload;
                                }
                                return user;
                            })]
                        }
                        return users;
                    })]
                };
            }
            return {...state,
                users: [...state.users.map(user => {
                    if (user.name === action.payload.name) {
                        return action.payload;
                    }
                    return user
                })]
            };
            case RESET_HISTORY:
                return {...state, history: [action.payload, ...state.history]}
            case SHOW_HISTORY_DAY_PREV:
                if (state.isCurrentSaved) {
                    return {...state,
                        dayIndex: state.dayIndex + 1,
                        users: [...state.history[state.dayIndex + 1]],
                    }
                }
                return {...state,
                    isCurrentSaved: true,
                    history: [state.users, ...state.history],
                    dayIndex: state.dayIndex + 1,
                    users: [...state.history[state.dayIndex]]
                }
            case SHOW_HISTORY_DAY_NEXT:
                return {...state,
                    dayIndex: state.dayIndex - 1,
                    users: [...state.history[state.dayIndex - 1]]
                }
            case SHOW_CURRENT_DAY:
                return {...state,
                    dayIndex: 0,
                    users: [...state.history[0]]
                }
        default:
            return state;
    }
}