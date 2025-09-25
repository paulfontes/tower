import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { TowerEvent } from "@/models/TowerEvent.js"

class EventsService {
    cancelEvent(eventId) {
        throw new Error('Method not implemented.')
    }
    async getEvents() {
        const response = await api.get('api/events')
        const events = response.data.map(e => new TowerEvent(e))
        logger.log('getting events', events)
        AppState.towerEvent = events
    }
    async createEvent(eventData) {
        const response = await api.post('api/events', eventData)
        const newEvent = new TowerEvent(response.data)
        AppState.towerEvent.unshift(newEvent)
        return newEvent
    }

}

export const eventsService = new EventsService()