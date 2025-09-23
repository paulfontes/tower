import { Auth0Provider } from "@bcwdev/auth0provider/lib/Auth0Provider.js";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventsService.js";

export class TowerEventController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTowerEvent)
    }

    async createTowerEvent(request, response, next) {
        try {
            const towerEventData = request.body
            const userInfo = request.userInfo
            towerEventData.id = userInfo.id
            const towerEvent = await towerEventsService.createTowerEvent(towerEventData)
            response.send(towerEvent)
        }
        catch (error) {
            next(error)
        }
    }

}