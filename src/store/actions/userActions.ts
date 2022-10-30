import axios from "axios";
import { Dispatch } from "react";
import { IUserITemType } from "../../types/userTypes";

export const ADD_NEW_USER = 'ADD_NEW_USER';
export const EDIT_SCORE = 'EDIT_SCORE';
export const SET_USERS = "SET_USERS";
export const RESET_HISTORY = 'RESET_HISTORY';
export const SHOW_HISTORY_DAY_PREV = 'SHOW_HISTORY_DAY_PREV';
export const SHOW_HISTORY_DAY_NEXT = 'SHOW_HISTORY_DAY_NEXT';
export const SHOW_CURRENT_DAY = 'SHOW_CURRENT_DAY';
export const SET_TOP_USERS = 'SET_TOP_USERS';

export const addNewCheckedUser = (user: any) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response = await axios.post('http://coding-test.cube19.io/frontend/v1/process-user',{
                username: user.name
            })
            const newUser = {
                name: Object.values(response.data)[0],
                score: +user.score
            }
            dispatch({type: ADD_NEW_USER, payload: newUser});
        } catch (err: any) {
            if (err.response.status === 500) {
                dispatch(addNewCheckedUser(user))
            }
        }
    }
}

export const editUserScore = (payload: any) => {
    return {
        type: EDIT_SCORE,
        payload
    }
}

export const fetchUsers = () => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const response = await axios.get('http://coding-test.cube19.io/frontend/v1/starting-state');
            const sortedUsers = response.data.map((user: IUserITemType) => {
                if (!user.score) {
                    user.score = 0
                }
                return user;
            })
            .sort((a: IUserITemType, b: IUserITemType) => b.score - a.score);
            
            dispatch({type: SET_USERS, payload: sortedUsers});
        } catch (err: any) {
            if (err.response.status === 500) {
                dispatch(fetchUsers())
            }
        }
    }
}
