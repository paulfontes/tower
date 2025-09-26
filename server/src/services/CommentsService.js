import { Forbidden } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"

class CommentsService {
    async deleteComment(commentId, userInfo) {
        const delComment = await dbContext.Comments.findById(commentId)

        if (!delComment) {
            throw new Error(`Invalid delComment id: ${commentId}`)
        }

        if (delComment.creatorId != userInfo.id) {
            throw new Forbidden('YOU CANNOT DELETE ANOTHER USERS TICKET')
        }
        await delComment.deleteOne()

    }
    async getEventComments(eventId) {
        const comments = await dbContext.Comments.find({ eventId }).populate('creator', 'name picture')

        return comments
    }
    async createComment(commentBody) {
        const comment = await dbContext.Comments.create(commentBody)
        await comment.populate('creator', 'name picture')
        return comment
    }

}

export const commentsService = new CommentsService()