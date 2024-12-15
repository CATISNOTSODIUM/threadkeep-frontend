export interface Thread {
    id: string,
    title: string,
    content: string,
    user: User,
    likes: number,
    views: number,
    createdAt: string,
    updatedAt: string
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
    id: string
}