import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { findTopUsers } from "../../functions";
import { getRandomImg } from "../../functions";
import headerImg from "../../img/business-people.svg";
import "./userListHeader.css"

const UserListHeader = () => {
    const {history, users, isCurrentSaved} = useTypedSelector(state => state.users)
    let topUsersList = [];
    if (isCurrentSaved) {
        topUsersList = findTopUsers(history)
    } else {
        topUsersList = findTopUsers([...history, users])
    }
    
    return (
        <div className="user-list-header">
            <div className="user-list-header__top-users">
                <h3 className="user-list-header__title">All time Highest Scores</h3>
                <div className="user-list-header__wrapper">
                    {topUsersList.map(user => {
                        return <div key={user.name} className="user-list-header__top-user">
                                <img className="user-list-header__avatar" src={getRandomImg(40)} alt="avatar" />
                                <div className="user-list-header__score">{user.score}</div>
                                <div className="user-list-header__name">{user.name}</div>
                            </div>
                    })}
                </div>
            </div>
            <div className="user-list-header__image-wrapper">
                <img className="user-list-header__image" src={headerImg} alt="bg-img" />
            </div>
        </div>
    )
}

export default UserListHeader;