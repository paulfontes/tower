import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { TowerEvent } from "@/models/TowerEvent.js"

class EventsService {
    async cancelEvent(eventId) {
        const response = await api.delete(`api/events/${eventId}`)
        const event = new TowerEvent(response.data)
        AppState.activeEvent = event
        // const index = AppState.towerEvent.findIndex(e => e.id == eventId)
        // AppState.towerEvent.splice(index)
        // logger.log(AppState.towerEvent)
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
    async getEventById(eventId) {
        const response = await api.get(`api/events/${eventId}`)
        const event = new TowerEvent(response.data)
        AppState.activeEvent = event
    }

}

export const eventsService = new EventsService()