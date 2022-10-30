import { useState } from "react";
import { findPrevScore, getRandomImg } from "../../functions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IUserListItemProps } from "../../types/userTypes";
import Modal from "../Modal/Modal";
import Button from "../UI/Button";
import './userItem.css'

const UserItem = ({user, place}: IUserListItemProps) => {
    const [editUserModalActive, setEditUserModalActive] = useState(false);
    const {dayIndex, history} = useTypedSelector(state => state.users)

    let rancData;
    if (history[dayIndex + 1]) {
        rancData = findPrevScore(user, history[dayIndex + 1])
    } else if (history.length === 1) {
        rancData = findPrevScore(user, history[0])
    } else {
        rancData = {
            color: 'rgb(247, 140, 0)',
            className: 'icon-caret-right',
            scoreDiff: ' ',
            text: 'No changes'
        }
    }

    return (
        <div className="user">
            <div className="user__left">
                <div className="user__place">{place}</div>
                <div className="user__avatar">
                    <img src={getRandomImg(20)} alt="avatar" />
                </div>
                <div className="user__score">{user.score ? user.score : 0}</div>
                <div className="user__name">{user.name}</div>
            </div>
            <div className="user__right">
                <div className="user__rank" style={{color: rancData.color}}>
                    <i className={rancData.className}></i>
                    {rancData.scoreDiff}
                    {rancData.text}
                </div>
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