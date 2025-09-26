import { Auth0Provider } from "@bcwdev/auth0provider/lib/Auth0Provider.js";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";

export class TowerEventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('/:eventId/comments', this.getEventComments)
            .get('/:eventId/tickets', this.getEventTickets)
            .get('/:eventId/tickets', this.getTicketsByEventId)
            .get('/:eventId', this.getEventById)
            .get('', this.getTowerEvents)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .put('/:eventId', this.editEvent)
            .post('', this.createTowerEvent)
            .delete('/:eventId', this.cancelEvent)
    }
    async getEventComments(request, response, next) {
        try {
            const eventId = request.params.eventId
            const comments = await commentsService.getEventComments(eventId)
            response.send(comments)
        } catch (error) {
            next(error)
        }
    }
    async getEventTickets(request, response, next) {
        try {
            const eventId = request.params.eventId
            const eventTickets = await ticketsService.getEventTicketsByEventId(eventId)
            response.send(eventTickets)
        } catch (error) {
            next(error)
        }
    }
    async getTicketsByEventId(request, response, next) {
        try {
            const eventId = request.params.eventId
            const tickets = await ticketsService
        } catch (error) {
            next(error)
        }
    }
    async cancelEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const userInfo = request.userInfo
            const event = await towerEventsService.cancelEvent(eventId, userInfo)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }

    async createTowerEvent(request, response, next) {
        try {
            const towerEventData = request.body
            const userInfo = request.userInfo
            towerEventData.creatorId = userInfo.id
            const towerEvent = await towerEventsService.createTowerEvent(towerEventData)
            response.send(towerEvent)
        }
        catch (error) {
            next(error)
        }
    }

    async getTowerEvents(request, response, next) {
        try {
            const gettingEvents = await towerEventsService.getAllEvents()
            response.send(gettingEvents)
        }
        catch (error) {
            next(error)
        }
    }

    async getEventById(request, response, next) {
        try {
            // --------------------------this event Id has to match the /:eventId in the .get in the router 
            const eventId = request.params.eventId
            const event = await towerEventsService.getEventById(eventId)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }
    async editEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const updateData = request.body
            const userInfo = request.userInfo
            const updateEvent = await towerEventsService.editEvent(eventId, updateData, userInfo)
            response.send(updateEvent)
        } catch (error) {
            next(error)
        }
    }


}