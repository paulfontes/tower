import { dbContext } from "../db/DbContext.js"

class TowerEventsService {
    async createTowerEvent() {
        const event = await dbContext.TowerEvent.create('api/events')
        await event.populate('creator', 'name picture')
        return event
    }
}

export const towerEventsService = new TowerEventsService()