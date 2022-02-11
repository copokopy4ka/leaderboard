import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRandomImg } from "../../functions";
import { IUserListItemProps } from "../../types/userTypes";
import Modal from "../Modal/Modal";
import Button from "../UI/Button";
import './userItem.css'



const UserItem = ({user, place}: IUserListItemProps) => {
    const [editUserModalActive, setEditUserModalActive] = useState(false);

    return (
        <div className="user">
            <div className="user__left">
                <div className="user__place">{place}</div>
                <div className="user__avatar">
                    <img src={getRandomImg()} alt="avatar" />
                </div>
                <div className="user__score">{user.score ? user.score : 0}</div>
                <div className="user__name">{user.name}</div>
            </div>
            <div className="user__right">
                <div className="user__rank"><i className="icon-caret-right"></i>Rank here</div>
                <Button
                    onClick={() => setEditUserModalActive(true)}
                    className="btn user__edit-btn">
                        <i className="icon-pencil"></i>
                </Button>
            </div>
            <Modal user={user} modalActive={editUserModalActive} setModalActive={setEditUserModalActive}/>
        </div>
    )
}

export default UserItem;