<script setup>
import { AppState } from '@/AppState.js';
import CommentForm from '@/components/CommentForm.vue';
import { commentsService } from '@/services/CommentsService.js';
import { eventsService } from '@/services/EventsService.js';
import { ticketsService } from '@/services/TicketsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()

const account = computed(() => AppState.account)
const tickets = computed(() => AppState.ticketProfile)
const event = computed(() => AppState.activeEvent)
const isGoing = computed(() => tickets.value.some(ticket => ticket.accountId == account.value?.id))
const comments = computed(() => AppState.comments)
// const commentProfiles = computed(() => AppState.commentProfile)

onMounted(() => {

    getTicketsByEventId()
    getEventById()
    getCommentsByEventId()
})

async function deleteComment(commentId) {
    try {
        await commentsService.deleteComment(commentId)
    }
    catch (error) {
        Pop.error(error);
        logger.error('Could not get delete comment', error)
    }
}

async function getCommentsByEventId() {
    try {

        await commentsService.getCommentsByEventId(route.params.eventId)
    }
    catch (error) {
        Pop.error(error);
        logger.error('Could not get comments', error)
    }
}

async function getEventById() {
    try {
        await eventsService.getEventById(route.params.eventId)
    }
    catch (error) {
        Pop.error(error);
        logger.log("Couldn't get event by Id", error)
    }
}

async function cancelEvent() {
    try {
        await eventsService.cancelEvent(route.params.eventId)
    }
    catch (error) {
        Pop.error(error);
        logger.log('Could not cancel event', error)
    }
}

async function getTicketsByEventId() {
    try {
        await ticketsService.getTicketsByEventId(route.params.eventId)
    }
    catch (error) {
        Pop.error(error);
        logger.log('Could not get Ticket!', error)
    }
}

async function createTicket() {
    try {
        if (event.value.ticketCount == event.value.capacity) {
            return Pop.toast('Event is full!')
        }
        const ticketData = { eventId: route.params.eventId }
        await ticketsService.createTicket(ticketData)
        // NOTE don't need to do this
        // event.value.capacity -= event.value.ticketCount
        // return event.value.capacity
    }
    catch (error) {
        Pop.error(error);
        logger.log('Could not create ticket', error)
    }
}



</script>


<template>
    <article class="container">
        <section v-if="event" class="row">
            <!-- <div v-for="event in event" :key="event.id"> -->
            <div class="col-12 mb-4">
                <img :src="event.coverImg" alt="" class="img-fluid active-event-img rounded mt-5">
            </div>
            <div class="col-md-8">
                <div class="row">
                    <div class="col-md-3">
                        <h2>{{ event.name }}</h2>
                    </div>
                    <div class="col-md-2 text-center mt-2">
                        <span class="bg bg-primary rounded p-1">{{ event.type }}</span>
                    </div>
                    <div class="col-md-6 text-end mt-2">
                        <button v-if="event.creatorId == account?.id" @click="cancelEvent()"
                            class="btn btn-outline-red">
                            {{ event.isCanceled ? 'Continue Event' : 'Cancel Event' }}
                        </button>

                    </div>
                </div>
                <p>{{ event.description }}</p>
            </div>
            <div class="col-md-4 pt-5 text-center">
                <div class="card">
                    <div class="card-body">
                        <p class="mb-0">Interested in going?</p>
                        <p>Grab a ticket!</p>
                        <div v-if="event.isCanceled">
                            <b>EVENT HAS BEEN CANCELED</b>
                        </div>
                        <div v-if="event.capacity - event.ticketCount == 0">
                            <p>Sold Out</p>
                        </div>
                        <div v-if="isGoing">
                            <b>You are Attending!</b>
                        </div>
                        <div v-if="account">
                            <button v-if="!event.isCanceled && event.capacity - event.ticketCount > 0"
                                @click="createTicket()" class="btn btn-primary w-75">Attend</button>
                        </div>
                    </div>
                </div>
                <div class="text-end">
                    <p> {{ event.capacity - event.ticketCount }} spots left</p>
                </div>
            </div>
            <div class="row justify-content-between">
                <div class="col-md-7 col-12">
                    <b>Date and Time</b>
                    <p> <i class="mdi mdi-calendar"></i> Starts {{ event.startDate }}</p>
                    <b>Location</b>
                    <p><i class="mdi mdi-map-marker-plus"></i> {{ event.location }}</p>
                    <CommentForm />
                    <div class="row border mt-5 p-3">
                        <div v-for="comment in comments" :key="comment.body" class="card col-12 g-2">
                            <div class="card-body">
                                <div class="text-end">
                                    <img :src="comment.creator.picture" alt="" class="comment-img">
                                    <p>{{ comment.creator.name }}</p>
                                </div>
                                <p class=" w-75 mb-5 pb-5">{{ comment.body }}</p>
                                <button v-if="comment.creatorId == account.id" @click="deleteComment(comment.id)"
                                    class="btn btn-outline-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-12 text-center">
                    <b>Attendees</b>
                    <div class="card">
                        <div v-for="ticket in tickets" :key="ticket.id" class="card-body">
                            <img :src="ticket.profile.picture" alt="" class="profile-img">
                            <p>{{ ticket.profile.name }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </article>
</template>


<style lang="scss" scoped>
.active-event-img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    object-position: center;
    aspect-ratio: 1/1
}

.profile-img {
    width: 30%;
    border-radius: 50%;
}

.comment-img {
    height: 40px;
    border-radius: 50%;
}
</style>