import { dbContext } from "../db/DbContext.js"

class TowerEventsService {
    async createTowerEvent(towerEventData) {
        const event = await dbContext.TowerEvents.create(towerEventData)
        await event.populate('creator', 'name picture')

        return event
    }
    async getAllEvents() {
        const events = await dbContext.TowerEvents.find().populate('creator', 'name picture')
        return events
    }
    async getEventById(eventId) {
        const eventById = await dbContext.TowerEvents.findById(eventId).populate('creator', 'name picture')

        if (eventById == null) {
            throw new Error('There was no event by that Id')
        }

        return eventById
    }
    async editEvent(eventId, updateData) {
        const editEvent = await dbContext.TowerEvents.findByIdAndUpdate(eventId, updateData)

        if (editEvent == null) {
            throw new Error(`Invalid Event Id: ${eventId}`)
        }

        await editEvent.save()
        return editEvent
    }
    async cancelEvent(eventId) {
        const event = await this.editEvent(eventId)

        event.isCanceled = !event.isCanceled

        await event.save()
        return event
    }
}

export const towerEventsService = new TowerEventsService()