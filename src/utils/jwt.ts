import { User } from "../models/index.ts";
import { logOut } from "../redux/auth/authSlice.ts";
import { getID, getJWTToken, getName } from "./getReduxState.ts";
import { store } from "../redux/store.ts"


export const getUser: () => User = () => (
    {
        id: getID(),
        name: getName(),
        jwtToken: getJWTToken() ?? ''
    }
)

export const removeUser = () => {
    store.dispatch(logOut());
}