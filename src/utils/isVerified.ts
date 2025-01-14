import { getJWTToken } from "./getReduxState.ts";

export const isVerified = () => {
    return getJWTToken() != null;
}