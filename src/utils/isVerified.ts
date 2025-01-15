import { getJWTToken } from "./getReduxState.ts";

export const isVerified = () => {
    const token = getJWTToken();
    return token !== '' && token !== null;
}