import { isVerified } from "./isVerified.ts"

// store jwt token in a local storage
export const getJWTToken = () => {
    if (isVerified()) {
        return localStorage.getItem('jwtToken')
    } 
    return "";
}