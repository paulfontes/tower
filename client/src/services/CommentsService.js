import { AppState } from "@/AppState.js"
import { api } from "./AxiosService.js"
import { logger } from "@/utils/Logger.js"
import { Comment } from "@/models/Comment.js"

class CommentsService {
    async deleteComment(commentId) {
        const response = await api.delete(`api/comments/${commentId}`)
        const index = AppState.comments.findIndex(c => c.id == commentId)
        AppState.comments.splice(index, 1)
    }
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