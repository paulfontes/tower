<script setup>
import { AppState } from '@/AppState.js';
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

onMounted(() => {

    getTicketsByEventId()
    getEventById()
})

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
        event.value.capacity -= event.value.ticketCount
        return event.value.capacity
    }
    catch (error) {
        Pop.error(error);
        logger.log('Could not create ticket', error)
    }
}





</script>


<template>
    <article class="container">
        <section class="row">
            <!-- <div v-for="event in event" :key="event.id"> -->
            <div v-if="event">
                <div class="col-12">
                    <img :src="event.coverImg" alt="" class="img-fluid active-event-img rounded mt-5">
                </div>
                <section class="row justify">
                    <div class="col-3">
                        <h2>{{ event.name }}</h2>
                    </div>
                    <div class="col-2 text-center mt-2">
                        <span class="bg bg-primary rounded p-1">{{ event.type }}</span>
                    </div>
                    <div class="col-6 text-end mt-2">
                        <button v-if="event.creatorId == account?.id" @click="cancelEvent()"
                            class="btn btn-outline-red">
                            {{ event.isCanceled ? 'Continue Event' : 'Cancel Event' }}
                        </button>
                    </div>
                    <div class="col-8">
                        <p>{{ event.description }}</p>
                    </div>
                    <div class="col-4 pt-5 text-center">
                        <div class="card">
                            <div class="card-body">
                                <p class="mb-0">Interested in going?</p>
                                <p>Grab a ticket!</p>
                                <div v-if="isGoing">
                                    <b>You are Attending!</b>
                                </div>
                                <button v-else-if="account" @click="createTicket()"
                                    class="btn btn-primary w-75">Attend</button>
                            </div>
                        </div>
                        <div class="text-end">
                            <p> {{ event.capacity }} spots left</p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div class="col-5">
                            <b>Date and Time</b>
                            <p> <i class="mdi mdi-calendar"></i> Starts {{ event.startDate }}</p>
                            <b>Location</b>
                            <p><i class="mdi mdi-map-marker-plus"></i> {{ event.location }}</p>
                            <div class="col-7">
                                <p>See what folks are saying...</p>
                                <div class="card">
                                    <div class="card-body text-end">
                                        <textarea class="w-100" name="" id=""
                                            placeholder="Tell the people..."></textarea>
                                        <button>Post Comment</button>
                                    </div>
                                    <section class="row">
                                        <div class="col-12">
                                            <div class="card m-2">
                                                <div class="card-body"></div>
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
                                                    repellat
                                                    quo
                                                    totam! Unde, architecto! </p>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                        <div class="col-3 text-center">
                            <div class="row">
                                <b>Attendees</b>
                                <div class="card">
                                    <div v-for="ticket in tickets" :key="ticket.id" class="card-body">
                                        <img :src="ticket.profile.picture" alt="" class="profile-img">
                                        <p>{{ ticket.profile.name }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
            <!-- </div> -->
        </section>
    </article>
</template>


<style lang="scss" scoped>
.active-event-img {
    width: 100%;
    height: 300px;

}

.profile-img {
    width: 30%;
    border-radius: 50%;
}
</style>