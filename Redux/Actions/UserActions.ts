import { user } from '../../types/index';
import { LOGIN_USER, LOGOUT_USER } from '../Reducers/UserReducer';

export const loginUser = (payload:user) => {
    return ({
        type:LOGIN_USER,
        payload
    })
}

export const logoutUser = () => {
    return ({
        type:LOGOUT_USER
    })
}