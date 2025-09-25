import { Forbidden } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"

class TicketsService {
    async deleteTicket(ticketId, userInfo) {
        const ticket = await dbContext.Tickets.findById(ticketId)

        if (!ticket) {
            throw new Error(`Invalid ticket id: ${ticketId}`)
        }

        if (ticket.accountId != userInfo.id) {
            throw new Forbidden('YOU CANNOT DELETE ANOTHER USERS TICKET')
        }
        await ticket.deleteOne()
    }
    async getEventTicketsByEventId(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId }).populate('profile', 'name picture')
        return tickets

    }
    async createTicket(ticket) {
        const newTicket = await dbContext.Tickets.create(ticket)
        await newTicket.populate('profile', 'name picture')
        return newTicket
    }
    async getTicketsByAccountId(userId) {
        const tickets = await dbContext.Tickets.find({ accountId: userId }).populate({
            path: 'event',
            populate: {
                path: 'creator ticketCount',
                select: 'name picture'
            }
        })
        return tickets
    }

}
export const ticketsService = new TicketsService()