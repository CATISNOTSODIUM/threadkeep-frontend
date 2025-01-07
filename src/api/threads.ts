import { Tag, User } from "../models";
import {getJWTToken} from "../utils/jwt.ts"
const HOST_API = process.env.REACT_APP_BACKEND_API


export const threadList = async (skip, max_per_page, filter={}, userID="") => {
    let url = `${HOST_API}/threads?skip=${skip}&max_per_page=${max_per_page}`
    const urlName = filter["name"] 
    if (urlName) url += `&name=${urlName}`
    const urlTags = filter["tags"]
    if (urlTags) url += `&tags=${filter["tags"].join(',')}`
    url += `&userID=${userID}`
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${getJWTToken()}`,
            }
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
            headers: {
                "Authorization": `Bearer ${getJWTToken()}`,
            }
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
                "Authorization": `Bearer ${getJWTToken()}`,
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
    UNLIKE = 2,
    SAVED = 3,
    UNSAVE = 4,
}
export const reactionThread = async(user: User, threadID: string, reactionType: ReactionType) => {
    try {
        const response = await fetch(`${HOST_API}/threads/reaction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getJWTToken()}`,
            },
            body: JSON.stringify({
               userID: user.id,
               threadID: threadID,
               reaction: reactionType
            }),
        }).then((res) => {
            if (res.status === 200) {
                const output = res.json().then(data => console.log(data));
                console.log(output)
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
                "Authorization": `Bearer ${getJWTToken()}`,
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
                "Authorization": `Bearer ${getJWTToken()}`,
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
                "Authorization": `Bearer ${getJWTToken()}`,
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
                "Authorization": `Bearer ${getJWTToken()}`,
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
// tags cannot be modified
export const updateThread = async (threadID: string, user: User, title: string, content: string) => {
    try {
        const response = await fetch(`${HOST_API}/threads/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getJWTToken()}`,
            },
            body: JSON.stringify({
               threadID: threadID,
               title: title,
               content: content,
               user: user,
            }),
        }).then((res) => {
            if (res.status === 200) {
                res.json()
                    .then((data) => data.payload.data)
                    .catch((e) => {throw e})
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

export const updateComment = async (commentID: string, user: User, content: string) => {
    try {
        const response = await fetch(`${HOST_API}/comments/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getJWTToken()}`,
            },
            body: JSON.stringify({
               commentID: commentID,
               content: content,
               user: user,
            }),
        }).then((res) => {
            if (res.status === 200) {
                res.json()
                    .then((data) => console.log(data.payload.data))
                    .catch((e) => {throw e})
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

export const deleteThread = async (threadID: string, user: User) => {
    try {
        const response = await fetch(`${HOST_API}/threads/delete`, {
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
                res.json()
                    .then((data) => data.payload.data)
                    .catch((e) => {throw e})
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

export const deleteComment = async (commentID: string, user: User) => {
    try {
        const response = await fetch(`${HOST_API}/comments/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getJWTToken()}`,
            },
            body: JSON.stringify({
               commentID: commentID
            }),
        }).then((res) => {
            if (res.status === 200) {
                res.json()
                    .then((data) => data.payload.data)
                    .catch((e) => {throw e})
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
