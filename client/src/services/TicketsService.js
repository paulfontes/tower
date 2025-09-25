import { AppState } from "@/AppState.js"
import { api } from "./AxiosService.js"
import { TicketProfile } from "@/models/Ticket.js"
import { logger } from "@/utils/Logger.js"

class TicketsService {
    async createTicket(ticketData) {
        const response = await api.post('api/tickets', ticketData)
        const ticket = new TicketProfile(response.data)
        AppState.activeEvent.ticketCount++
    }
    async getTicketsByEventId(eventId) {
        AppState.ticketEvents = []
        const response = await api.get(`api/events/${eventId}/tickets`)
        const tickets = response.data.map(t => new TicketProfile(t))
        AppState.ticketProfile = tickets
    }

}

export const ticketsService = new TicketsService() 