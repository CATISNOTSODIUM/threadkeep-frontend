export interface Thread {
    id: string,
    title: string,
    content: string,
    user: User,
    tags: Tag[],
    likes: number,
    views: number,
    createdAt: string,
    updatedAt: string,
    isSaved: boolean // client only
}



// for side bar
export interface ThreadSimplified {
    threadID: string,
    title: string,
    content: string
}
export interface Comment {
    id: string,
    content: string,
    user: User,
    parentID: string,
    likes: number,
    views: number,
    createdAt: string,
    updatedAt: string 
}
export interface User {
    name: string,
    id: string,
    jwtToken: string
}

export interface Tag {
    name: string,
    id: string
}


// Default values : use for error handling 
export const defaultUser: User = {
    name: "",
    id: "",
    jwtToken: ""
}

export const defaultThread: Thread = {
    id: "",
    title: "",
    content: "",
    user: defaultUser,
    tags: [],
    likes: 0,
    views: 0,
    createdAt: "",
    updatedAt: "",
    isSaved: false
}

export const defaultComment: Comment = {
    id: "",
    content: "failed to load comment",
    user: defaultUser,
    parentID: "",
    likes: 0,
    views: 0,
    createdAt: "",
    updatedAt: "" 
}