export interface IDefaultState {
    users: any[];
}

export interface IUserITemType {
    name: string;
    score: number;
}

export interface IUserAction {
    type: string;
    payload?: any;
}

export interface IUserListItemProps {
    user: IUserITemType;
    place: string;
}

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    children?: React.ReactNode;
}

export interface IModalProps {
    user?: IUserITemType;
    modalActive: boolean;
    setModalActive: Function;
}