import React from "react";
import { IModalProps } from "../../types/userTypes";
import Form from "../Form/Form";
import Button from "../UI/Button";
import './modal.css'

const Modal = ({modalActive, setModalActive, user}: IModalProps) => {
    return (
        <div onClick={() => setModalActive(false)} className={modalActive ? 'modal active' : 'modal'}>
            <Form user={user ? user : null} setModalActive={setModalActive}>
                <Button type="button" onClick={() => setModalActive(false)} className="btn modal__close-btn"></Button>
            </Form>
        </div>
    )
}

export default Modal;