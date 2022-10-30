import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import {v4 as uuid} from 'uuid'
import UserItem from "../UserItem/UserItem";
import Button from "../UI/Button";
import Modal from "../Modal/Modal";
import '../../fonts/icons.css'
import './userList.css'
import { setUserPlace } from "../../functions";
import { fetchUsers, RESET_HISTORY, SHOW_CURRENT_DAY, SHOW_HISTORY_DAY_NEXT, SHOW_HISTORY_DAY_PREV } from "../../store/actions/userActions";

const UserList = () => {
    const dispatch = useDispatch();
    const {users, history, dayIndex, isCurrentSaved} = useTypedSelector(state => state.users);
    const [newUserModalActive, setNewUserModalActive] = useState(false);
    const sortedUsers = users.sort((a, b) => b.score - a.score);

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    return (
        <div className="user-list">
            <div className="user-list__header">
                <h3 className="user-list__title">Leaders table for this period</h3>
                <div className="user-list__actions">
                    <div
                        className={dayIndex === 0 ? 'user-list__day-number hidden' : 'user-list__day-number'}>
                            {dayIndex > 0 ? `Day ${history.length - dayIndex}` : 'I\'ll be back'}
                    </div>
                    <Button
                        onClick={() => {
                            dispatch({type: SHOW_HISTORY_DAY_PREV})
                        }}
                        className="btn user-list__prev-btn"
                        disabled={history.length === 1 ? false : dayIndex >= history.length - 1 ? true : false}>
                            <i className="icon-angle-left"></i>
                    </Button>
                    <Button
                    onClick={() => {
                        dispatch({type: SHOW_HISTORY_DAY_NEXT})
                    }}
                        className="btn user-list__next-btn"
                        disabled={dayIndex > 0 ? false : true}>
                            <i className="icon-angle-right"></i>
                    </Button>
                    <Button
                        onClick={() => dispatch({type: SHOW_CURRENT_DAY})}
                        className={dayIndex === 0 ? 'user-list__back-to-current hidden' : 'user-list__back-to-current'}>
                            <i className="icon-angle-right"></i><i className="icon-angle-right"></i>
                    </Button>
                    <Button
                        onClick={() => {
                            if (isCurrentSaved) {
                                dispatch(fetchUsers())
                                dispatch({type: SHOW_CURRENT_DAY})
                            } else {
                                dispatch({type: RESET_HISTORY, payload: users});
                                dispatch(fetchUsers())
                                dispatch({type: SHOW_CURRENT_DAY})
                            }
                        }}
                        className="btn user-list__new-day-btn">New day</Button>
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