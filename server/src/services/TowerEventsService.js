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

        // if (eventById == null) {
        //     throw new Error('There was no event by that Id')
        // }

        return eventById
    }
}

export const towerEventsService = new TowerEventsService()