import { User } from "../models/index.ts";
import {getJWTToken} from "../utils/getReduxState.ts"
const HOST_API = process.env.REACT_APP_BACKEND_API


export const tagList = async () => {
    try {
        const response = await fetch(`${HOST_API}/threads/tags`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${getJWTToken()}`,
            },
        }).then((res) => res.json())
        .then((data) => data.payload.data)
        .catch((e) => {console.error(e)})
        return response
    } catch (error) {
        console.error("Error in retrieving tag list", error);
    }
}

export const getThreadTags = async (user: User, threadID: string) => {
    try {
        const response = await fetch(`${HOST_API}/threads/tags`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getJWTToken()}`,
            },
            body: JSON.stringify({
               threadID: threadID
            }),
        }).then((res) => {
            if (res.status === 200) {
                return res.json()
                    .then((data) => data.payload.data)
                    .catch((e) => {console.error(e)})
            } else {
                return null
            }
        })
        return response
    } catch (error) {
        console.error("Error in retrieving thread", error);
    }
}
