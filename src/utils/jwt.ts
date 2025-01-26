import { User } from "../models/index.ts";
import { logOut } from "../feature/auth/authSlice.ts";
import { getID, getJWTToken, getName } from "./getReduxState.ts";
import { store } from "../feature/store.ts"


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