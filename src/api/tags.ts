import { Tag, User } from "../models";

const HOST_API = "http://localhost:5000";


export const tagList = async () => {
    try {
        const response = await fetch(`${HOST_API}/threads/tags`, {
            method: "GET"
        }).then((res) => res.json())
        .then((data) => data.payload.data)
        .catch((e) => {throw e})
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
                "Authorization": `Bearer ${user.id}`,
            },
            body: JSON.stringify({
               threadID: threadID
            }),
        }).then((res) => {
            if (res.status === 200) {
                return res.json()
                    .then((data) => data.payload.data)
                    .catch((e) => {throw e})
            } else {
                return null
            }
        })
        return response
    } catch (error) {
        console.error("Error in retrieving thread", error);
        throw error;
    }
}
