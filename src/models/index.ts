export interface Thread {
    title: string,
    content: string,
    user: User,
    likes: number,
    views: number,
    createdAt: string,
    updatedAt: string
}

export interface User {
    name: string,
    id: string
}