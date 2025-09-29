import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js"
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
    async editEvent(eventId, updateData, userInfo) {
        const originalEvent = await this.getEventById(eventId)

        if (originalEvent == null) throw new Error(`Invalid Event Id: ${eventId}`)

        if (userInfo.id != originalEvent.creatorId) { throw new Forbidden('WHAT ARE YOU DOING YOU LITTLE RAT!!🐀🔫') }

        if (originalEvent.isCanceled) throw new BadRequest(`${originalEvent.name} has been canceled!`)





        originalEvent.description = updateData.description || originalEvent.description

        originalEvent.name = updateData.name ?? originalEvent.name

        await originalEvent.save()
        return originalEvent
    }
    async cancelEvent(eventId, userInfo) {
        const event = await this.getEventById(eventId)
        if (userInfo.id != event.creatorId) {
            throw new Forbidden('WHAT ARE YOU DOING YOU LITTLE RAT!!🐀🔫')
        }

        event.isCanceled = !event.isCanceled
        await event.save()
        return event
    }
}

export const towerEventsService = new TowerEventsService()