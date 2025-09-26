import { AppState } from "@/AppState.js"
import { api } from "./AxiosService.js"
import { logger } from "@/utils/Logger.js"
import { Comment } from "@/models/Comment.js"

class CommentsService {
    async getCommentsByEventId(eventId) {
        const response = await api.get(`api/events/${eventId}/comments`)
        const comments = await response.data.map(c => new Comment(c))
        AppState.comments = comments

    }
    async createComment(commentData) {
        const response = await api.post(`api/comments`, commentData)
        const comment = new Comment(response.data)
        AppState.comments.push(comment)

    }

}
export const commentsService = new CommentsService()