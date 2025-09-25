import { dbContext } from "../db/DbContext.js"

class TowerEventsService {
    async createTowerEvent(towerEventData) {
        const event = await dbContext.TowerEvents.create(towerEventData)
        await event.populate('creator', 'name picture')
        await event.populate('ticketCount')
        return event
    }
    async getAllEvents() {
        const events = await dbContext.TowerEvents.find().populate('creator', 'name picture').populate('ticketCount')
        return events
    }
    async getEventById(eventId) {
        const eventById = await dbContext.TowerEvents.findById(eventId).populate('creator', 'name picture').populate('ticketCount')

        if (eventById == null) {
            throw new Error('There was no event by that Id')
        }

        return eventById
    }
    async editEvent(eventId, updateData) {
        const originalEvent = await dbContext.TowerEvents.findById(eventId)

        if (originalEvent == null) {
            throw new Error(`Invalid Event Id: ${eventId}`)
        }
        originalEvent.description = updateData.description || originalEvent.description

        originalEvent.name = updateData.name ?? originalEvent.name

        await originalEvent.save()
        return originalEvent
    }
    async cancelEvent(eventId) {
        const event = await dbContext.TowerEvents.findById(eventId)

        event.isCanceled = !event.isCanceled

        await event.save()
        return event
    }
}

export const towerEventsService = new TowerEventsService()