import { Auth0Provider } from "@bcwdev/auth0provider/lib/Auth0Provider.js";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventsService.js";

export class TowerEventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('/:eventId', this.getEventById)
            .get('', this.getTowerEvents)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTowerEvent)
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
            const eventId = request.param.eventId
            const event = await towerEventsService.getEventById(eventId)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }


}