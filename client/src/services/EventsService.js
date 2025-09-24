import { api } from "./AxiosService.js"

class EventsService {
    async getEvents() {
        const response = await api.get('api/events')
        log
    }

}

export const eventsService = new EventsService()