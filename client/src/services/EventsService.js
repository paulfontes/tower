import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { TowerEvent } from "@/models/TowerEvent.js"

class EventsService {
    async getEvents() {
        const response = await api.get('api/events')
        const events = response.data.map(e => new TowerEvent(e))
        logger.log('getting events', events)
        AppState.towerEvent = events
    }
    createEvent() {

    }

}

export const eventsService = new EventsService()