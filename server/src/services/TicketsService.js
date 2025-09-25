import { dbContext } from "../db/DbContext.js"

class TicketsService {
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