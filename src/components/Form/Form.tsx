import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewUser, editUserScore } from "../../store/actions/userActions";
import Button from "../UI/Button";
import Input from "../UI/Input";
import './form.css'

const Form = (props: any) => {
    const dispatch = useDispatch();
    const [userScore, setUserScore] = useState ('');
    const [userName, setUserName] = useState('');

    const setNewUserData = () => {
        let result;

        if (props.user) {
            result = {
                name: props.user.name,
                score: userScore
            }

            dispatch(editUserScore(result));
        } else {
            result = {
                name: userName,
                score: userScore
            }

            dispatch(addNewUser(result));
        }
        props.setModalActive(false)
        setUserName('');
        setUserScore('')
    }

    return (
        <form className="form" onClick={(e) => e.stopPropagation()} onSubmit={(e) => e.preventDefault()}>
            <h3 className="form__title">{props.user ? 'Edit user score' : 'Add user score'}</h3>
            <Input
                disabled={props.user ? true : false}
                className="form__name"
                type="text"
                value={props.user ? props.user.name : userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Name:"
            />
            <Input
                className="form__score"
                value={userScore}
                type='number'
                onChange={(e) => setUserScore(e.target.value)}
                placeholder="Score:"
            />
            <Button type="submit" onClick={() => setNewUserData()} className="btn form__btn">Save</Button>
            {props.children}
        </form>
    )
}

export default Form;