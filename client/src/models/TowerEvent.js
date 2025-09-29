export class TowerEvent {
    constructor(data) {
        this.id = data.id
        this.creatorId = data.creatorId
        this.name = data.name
        this.description = data.description
        this.coverImg = data.coverImg
        this.location = data.location
        this.capacity = data.capacity
        this.startDate = new Date(data.startDate).toLocaleDateString('en', {
            month: 'short',
            day: '2-digit'
        })
        this.isCanceled = data.isCanceled
        this.type = data.type
        this.creator = data.creator
        // ticketCount comes from a virtual populate on the server. Some responses
        // (like the cancel toggle) may return the raw document without the
        // populated count. Default to 0 to avoid NaN when calculating spots left.
        this.ticketCount = data.ticketCount
        this.commentCount = data.commentCount
    }
}