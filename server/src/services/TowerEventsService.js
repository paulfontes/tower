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
}

export const towerEventsService = new TowerEventsService()