import { User } from "../models/index.ts";
import { isVerified } from "./isVerified.ts"

// store jwt token in a local storage
export const getJWTToken = () => {
    if (isVerified()) {
        return localStorage.getItem('jwtToken')
    } 
    return "";
}
export const getUser: () => User = () => (
    {
        id: localStorage.getItem("userID") ?? '',
        name: localStorage.getItem("userName") ?? '',
        jwtToken: localStorage.getItem("jwtToken") ?? ''
    }
)