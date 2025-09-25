import { Profile } from "./Account.js"
import { TowerEvent } from "./TowerEvent.js"

class Ticket {
    constructor(data) {
        this.id = data.id || data._id
        this.accountId = data.accountId
        this.eventId = data.eventId
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
    }
}

export class TicketProfile extends Ticket {
    constructor(data) {
        super(data)
        this.profile = new Profile(data.profile)
    }
}
export class TicketEvent extends Ticket {
    constructor(data) {
        super(data)
        this.event = new TowerEvent(data.event)
    }
}
