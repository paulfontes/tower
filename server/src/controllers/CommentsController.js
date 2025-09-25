import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";

export class CommentsController extends BaseController {
    constructor(data) {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
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