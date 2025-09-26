import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";

export class CommentsController extends BaseController {
    constructor(data) {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .delete('/:commentId', this.deleteComment)
    }
    async deleteComment(request, response, next) {
        try {
            const commentId = request.params.commentId
            const userInfo = request.userInfo
            const deleteCom = await commentsService.deleteComment(commentId, userInfo)
            response.send('Comment was Deleted')
        } catch (error) {
            next(error)
        }
    }

    async createComment(request, response, next) {
        try {
            const commentBody = request.body
            const userInfo = request.userInfo
            commentBody.creatorId = userInfo.id
            const comment = await commentsService.createComment(commentBody)
            response.send(comment)
        } catch (error) {
            next(error)
        }
    }
}