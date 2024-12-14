import { User } from "../models";

const HOST_API = "http://localhost:8000";


export const threadList = async () => {
    try {
        const response = await fetch(`${HOST_API}/threads`, {
            method: "GET"
        }).then((res) => res.json())
        .then((data) => data.payload.data)
        .catch((e) => {throw e})
        
        return response
    } catch (error) {
        console.error("Error in retrieving document list", error);
        throw error;
    }
}

export const createNewThread = async (user: User, title: string, content: string) => {
    try {
        const response = await fetch(`${HOST_API}/threads/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.id}`,
            },
            body: JSON.stringify({
               title: title,
               content: content,
               user: user
            }),
        }).then((res) => res.json())
        .then((data) => data.payload.data)
        .catch((e) => {throw e})
        return response
    } catch (error) {
        console.error("Error in retrieving document list", error);
        throw error;
    }
}