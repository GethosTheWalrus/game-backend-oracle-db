export type ChatMessage = {
    messageText: string,
    user: string,
    socketId?: string,
    type?: string
}