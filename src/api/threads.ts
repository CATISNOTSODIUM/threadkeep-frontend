import { use } from "react";
import { Tag, User } from "../models";

const HOST_API = "http://localhost:5000";


export const threadList = async (skip, max_per_page) => {
    try {
        const response = await fetch(`${HOST_API}/threads?skip=${skip}&max_per_page=${max_per_page}`, {
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

export const countThread = async () => {
    try {
        const response = await fetch(`${HOST_API}/threads/count`, {
            method: "GET",
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

export const getThread = async (user: User, threadID: string) => {
    try {
        const response = await fetch(`${HOST_API}/threads`, {
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

export enum ReactionType {
    VIEW = 0,
    LIKE = 1,
    UNLIKE = 2
}
export const reactionThread = async(user: User, threadID: string, reactionType: ReactionType) => {
    console.log(reactionType)
    try {
        const response = await fetch(`${HOST_API}/threads/reaction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.id}`,
            },
            body: JSON.stringify({
               userID: user.id,
               threadID: threadID,
               reaction: reactionType
            }),
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(data => console.log(data));
                return true
            } else {
                return false
            }
        })
        return response
    } catch (error) {
        console.error("Error in reacting thread", error);
    }
}

export const isLike = async(user: User, threadID: string) => {
    try {
        const response = await fetch(`${HOST_API}/threads/reaction/isLike`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.id}`,
            },
            body: JSON.stringify({
               threadID: threadID,
               userID: user.id
            }),
        }).then((res) => {
            if (res.status === 200) {
                const result =  res.json()
                    .then((data) => data.payload.data)
                    .catch((e) => {throw e})
                return result;
            } else {
                return false
            }
        })
        return response
    } catch (error) {
        console.error("Error in reacting thread", error);
        throw error;
    }
}

export const getComments = async (user: User, threadID: string) => {
    try {
        const response = await fetch(`${HOST_API}/comments`, {
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
    }
}

export const createNewComment = async (user: User, threadID: string, content: string) => {
    try {
        const response = await fetch(`${HOST_API}/comments/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.id}`,
            },
            body: JSON.stringify({
               threadID: threadID,
               content: content,
               user: user
            }),
        }).then((res) => res.json())
        .then((data) => data.payload.data)
        .catch((e) => {throw e})
        return response
    } catch (error) {
        console.error("Error in retrieving document list", error);
    }
}

export const createNewThread = async (user: User, title: string, content: string, tags: Tag[]) => {
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
               user: user,
               tags: tags
            }),
        }).then((res) => {
            if (res.status === 200) {
                return true;
            } else {
                return false
            }
        })
        return response

    } catch (error) {
        console.error("Error in retrieving document list", error);
    }
}