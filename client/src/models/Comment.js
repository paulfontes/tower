import { Profile } from "./Account.js"
import { TowerEvent } from "./TowerEvent.js"

export class Comment {
    constructor(data) {
        this.id = data.id
        this.creatorId = data.creatorId
        this.eventId = data.eventId
        this.body = data.body
        this.createdAt = new Date(data.createdAt)
        this.updateAt = new Date(data.updateAt)
        this.creator = data.creator
    }

}


