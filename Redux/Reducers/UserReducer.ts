import { AsyncStorage } from "react-native"

export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

type InitialState = {
    loggedIn:Boolean
}
const initState:InitialState = {
    loggedIn:false
}
type Action = {
    type:String,
    payload:any
}
const userReducer = (state = initState, action:Action) => {
    console.log('payload ',action.payload)
    switch (action.type) {
        case LOGIN_USER:
            // localStorage.setItem('user',JSON.stringify(action.payload))
            AsyncStorage.setItem("user",JSON.stringify({
                ...action.payload,loggedIn :true
            }))
            return {
                ...action.payload,loggedIn :true
            }
        case LOGOUT_USER:
            // localStorage.removeItem('user')
            AsyncStorage.removeItem("user")
            return {
                loggedIn:false
            }
        default:
            return state
    }
}

export default userReducer;
