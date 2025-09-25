import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";


export class TicketsController extends BaseController {
    constructor(data) {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', createTicket)
            .delete('/:ticketId', this.deleteTicket)
    }
    async deleteTicket(request, response, next) {
        try {
            const ticketId = request.params.ticketId
            const userInfo = request.userInfo
            await ticketsService.deleteTicket(ticketId, userInfo)
            response.send('deleted ticket')
        } catch (error) {
            next(error)
        }
    }
}

async function createTicket(request, response, next) {
    try {
        const ticketBody = request.body
        const userInfo = request.userInfo
        ticketBody.accountId = userInfo.id
        const ticket = await ticketsService.createTicket(ticketBody)
        response.send(ticket)
    } catch (error) {
        next(error)
    }
}
