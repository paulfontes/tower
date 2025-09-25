import { AppState } from "@/AppState.js"
import { api } from "./AxiosService.js"
import { TicketEvent, TicketProfile } from "@/models/Ticket.js"
import { logger } from "@/utils/Logger.js"

class TicketsService {
    async deleteTicket(ticketId) {
        const response = await api.delete(`api/tickets/${ticketId}`)
        logger.log('Deleted Ticket!', response.data)
        const index = AppState.ticketEvents.findIndex(ticket => ticket.id == ticketId)
        AppState.ticketEvents.splice(index, 1)
    }
    async getMyTicketEvents() {
        const response = await api.get('account/tickets')
        const ticketEvents = response.data.map(t => new TicketEvent(t))
        AppState.ticketEvents = ticketEvents
    }
    async createTicket(ticketData) {
        const response = await api.post('api/tickets', ticketData)
        const ticket = new TicketProfile(response.data)
        AppState.ticketProfile.push(ticket)
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