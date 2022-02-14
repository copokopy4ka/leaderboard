import axios from "axios";
import { Dispatch } from "react";
import { IUserITemType } from "../../types/userTypes";

export const ADD_NEW_USER = 'ADD_NEW_USER';
export const EDIT_SCORE = 'EDIT_SCORE';
export const SET_USERS = "SET_USERS";

export const addNewUser = (payload: any) => {
    return {
        type: ADD_NEW_USER,
        payload
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
            dispatch({type: SET_USERS, payload: sortedUsers})
        } catch (err: any) {
            if (err.response.status === 500) {
                dispatch(fetchUsers())
            }
        }
    }
}
