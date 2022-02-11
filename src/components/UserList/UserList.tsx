import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import {v4 as uuid} from 'uuid'
import UserItem from "../UserItem/UserItem";
import Button from "../UI/Button";
import Modal from "../Modal/Modal";
import '../../fonts/icons.css'
import './userList.css'
import Form from "../Form/Form";
import { IUserITemType } from "../../types/userTypes";

const UserList = () => {
    const dispatch = useDispatch();
    const {users} = useTypedSelector(state => state.users);
    const sortedUsers = users.sort((a, b) => b.score - a.score);
    const [newUserModalActive, setNewUserModalActive] = useState(false)

    const setUserPlace = (index: number) => {
        let userPlace: string = '';

        if (index + 1 === 1) {
            userPlace = `${index + 1}st`
        } else if (index + 1 === 2) {
            userPlace = `${index + 1}nd`
        } else if (index + 1 === 3) {
            userPlace = `${index + 1}rd`
        } else {
            userPlace = `${index + 1}th`
        }

        return userPlace;
    }

    return (
        <div className="user-list">
            <div className="user-list__header">
                <h3 className="user-list__title">Leaders table for this period</h3>
                <div className="user-list__actions">
                    <Button className="btn user-list__prev-btn"><i className="icon-angle-left"></i></Button>
                    <Button className="btn user-list__next-btn"><i className="icon-angle-right"></i></Button>
                    <Button className="btn user-list__new-day-btn">New day</Button>
                    <Button className="btn user-list__new-user-btn" onClick={() => setNewUserModalActive(true)}>+ Add new user</Button>
                </div>
            </div>
            <div className="user-list__table">
                {sortedUsers.map((item, index) => {
                    return <UserItem key={uuid()} user={item} place={setUserPlace(index)}/>
                })}
            </div>
            <Modal modalActive={newUserModalActive} setModalActive={setNewUserModalActive}/>
        </div>
    )
}

export default UserList;