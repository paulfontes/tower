import { dbContext } from "../db/DbContext.js"

class CommentsService {
    async createComment(commentBody) {
        const comment = await dbContext.Comments.create(commentBody)
        await comment.populate('creator', 'name picture')
        return comment
    }

}

export const commentsService = new CommentsService()