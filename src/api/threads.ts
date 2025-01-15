import { Comment, defaultComment, defaultThread, Tag, Thread, User } from "../models/index.ts";
import {getJWTToken} from "../utils/getReduxState.ts"
import { Optional } from "./types.ts";
const HOST_API = process.env.REACT_APP_BACKEND_API

interface ThreadListFilter {
    name?: string;
    tags?: string[];
}

// List all threads
export async function threadList(
    skip: number,
    maxPerPage: number,
    filter: ThreadListFilter = {},
    userID = ""
): Promise<Optional<Thread[]>> {
    try {
        // Build URL with URLSearchParams for proper encoding
        const params = new URLSearchParams({
            skip: skip.toString(),
            max_per_page: maxPerPage.toString(),
            userID
        });

        // Add optional filters if present
        if (filter.name) {
            params.append('name', filter.name);
        }
        if (filter.tags?.length) {
            params.append('tags', filter.tags.join(','));
        }

        const url = `${HOST_API}/threads?${params.toString()}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getJWTToken()}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
            data: data.payload.data,
            error: null
        };

    } catch (error) {
        return {
            data: [],
            error: error instanceof Error ? error.message : String(error)
        };
    }
}


export async function countThread(): Promise<Optional<number>> {
    try {
        const response = await fetch(`${HOST_API}/threads/count`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getJWTToken()}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
            data: data.payload.data,
            error: null
        };

    } catch (error) {
        return {
            data: 0, // default value
            error: error instanceof Error ? error.message : String(error)
        };
    }
}

export async function getThread(threadID: string): Promise<Optional<Thread>> {
    try {
        const response = await fetch(`${HOST_API}/threads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getJWTToken()}`
            },
            body: JSON.stringify({ threadID })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return {
            data: data.payload.data,
            error: null
        };

    } catch (error) {
        return {
            data: defaultThread,
            error: error instanceof Error ? error.message : String(error)
        };
    }
}


export enum ReactionType {
    VIEW = 0,
    LIKE = 1,
    UNLIKE = 2,
    SAVED = 3,
    UNSAVE = 4,
}

export async function reactionThread(
    user: User,
    threadID: string,
    reactionType: ReactionType
): Promise<Optional<boolean>> {
    try {
        const response = await fetch(`${HOST_API}/threads/reaction`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getJWTToken()}`
            },
            body: JSON.stringify({
                userID: user.id,
                threadID,
                reaction: reactionType
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return {
            data: true,
            error: null
        };

    } catch (error) {
        return {
            data: false,
            error: error instanceof Error ? error.message : String(error)
        };
    }
}


export async function isLike(user: User, threadID: string): Promise<Optional<boolean>> {
    try {
        const response = await fetch(`${HOST_API}/threads/reaction/isLike`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getJWTToken()}`
            },
            body: JSON.stringify({
                threadID,
                userID: user.id
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
            data: data.payload.data,
            error: null
        };

    } catch (error) {
        return {
            data: false,
            error: error instanceof Error ? error.message : String(error)
        };
    }
}

export async function getComments(threadID: string): Promise<Optional<Comment[]>> {
    try {
        const response = await fetch(`${HOST_API}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getJWTToken()}`
            },
            body: JSON.stringify({
                threadID
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
            data: data.payload.data,
            error: null
        };

    } catch (error) {
        return {
            data: [defaultComment],
            error: error instanceof Error ? error.message : String(error)
        };
    }
}

export async function createNewComment(
    user: User,
    threadID: string,
    content: string
): Promise<Optional<boolean>> {
    try {
        const response = await fetch(`${HOST_API}/comments/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getJWTToken()}`
            },
            body: JSON.stringify({
                threadID,
                content,
                user
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return {
            data: true,
            error: null
        }

    } catch (error) {
        return {
            data: false,
            error: error instanceof Error ? error.message : String(error)
        }
    }
}


export async function createNewThread(
    user: User, 
    title: string, 
    content: string, 
    tags: Tag[]
): Promise<Optional<boolean>> {
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
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return {
            data: true,
            error: null
        }

    } catch (error) {
        return {
            data: false,
            error: error instanceof Error ? error.message : String(error)
        };
    }
}

export async function updateThread(
    threadID: string,
    user: User,
    title: string,
    content: string
): Promise<Optional<boolean>> {
    try {
        const response = await fetch(`${HOST_API}/threads/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getJWTToken()}`
            },
            body: JSON.stringify({
                threadID,
                title,
                content,
                user
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return {
            data: true,
            error: null
        };

    } catch (error) {
        return {
            data: false,
            error: error instanceof Error ? error.message : String(error)
        };
    }
}


export async function updateComment(
    commentID: string,
    user: User,
    content: string
): Promise<Optional<boolean>> {
    try {
        const response = await fetch(`${HOST_API}/comments/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getJWTToken()}`
            },
            body: JSON.stringify({
                commentID,
                content,
                user
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return {
            data: true,
            error: null
        };

    } catch (error) {
        return {
            data: false,
            error: error instanceof Error ? error.message : String(error)
        };
    }
}

export async function deleteThread(
    threadID: string,
    user: User
): Promise<Optional<boolean>> {
    try {
        const response = await fetch(`${HOST_API}/threads/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getJWTToken()}`
            },
            body: JSON.stringify({
                threadID,
                user
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return {
            data: true,
            error: null
        };

    } catch (error) {
        return {
            data: false,
            error: error instanceof Error ? error.message : String(error)
        };
    }
}

export async function deleteComment(
    commentID: string,
    user: User,
): Promise<Optional<boolean>> {
    try {
        const response = await fetch(`${HOST_API}/comments/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getJWTToken()}`
            },
            body: JSON.stringify({
                commentID,
                user
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return {
            data: true,
            error: null
        };

    } catch (error) {
        return {
            data: false,
            error: error instanceof Error ? error.message : String(error)
        };
    }
}