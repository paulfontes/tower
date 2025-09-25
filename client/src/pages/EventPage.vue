<script setup>
import { AppState } from '@/AppState.js';
import { eventsService } from '@/services/EventsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()

const events = computed(() => AppState.towerEvent)

async function cancelEvent(eventId) {
    try {
        await eventsService.cancelEvent(route.params.eventId)
    }
    catch (error) {
        Pop.error(error);
        logger.log('Could not cancel event', error)
    }
}


</script>


<template>
    <article class="container">
        <section class="row">
            <div v-for="event in events" :key="event.id">
                <div v-if="route.params.eventId == event.id">
                    <div class="col-12">
                        <img :src="event.coverImg" alt="" class="img-fluid active-event-img rounded mt-5">
                    </div>
                    <section class="row justify">
                        <div class="col-2">
                            <h2>{{ event.name }}</h2>
                        </div>
                        <div class="col-2 ms-5">
                            <span class="bg bg-primary rounded p-0">{{ event.type }}</span>
                        </div>
                        <div class="col-6 text-end mt-2">
                            <button @click="cancelEvent(event.id)" class="btn btn-outline-red">Cancel Event</button>
                        </div>
                        <div class="col-8">
                            <p>{{ event.description }}</p>
                        </div>
                        <div class="col-4 pt-5 text-center">
                            <div class="card">
                                <div class="card-body">
                                    <p class="mb-0">Interested in going?</p>
                                    <p>Grab a ticket!</p>
                                    <button class="btn btn-primary w-75">Attend</button>
                                </div>
                            </div>
                            <div class="text-end">
                                <p>{{ event.capacity }} spots left</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="col-5">
                                <p>Date and Time</p>
                                <p> <i class="mdi mdi-calendar"></i> Starts {{ event.startDate }}</p>
                                <p>Location</p>
                                <p><i class="mdi mdi-map-marker-plus"></i> {{ event.location }}</p>
                            </div>
                            <div class="col-5 text-end">
                                <p>Attendees</p>
                                <div class="card">
                                    <div class="card-body">
                                        <p> Joe Bob</p>
                                        <p> Bob Joe</p>
                                        <p> Jok Mok</p>
                                        <p> Lok Slo</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-7">
                            <p>See what folks are saying...</p>
                            <div class="card">
                                <div class="card-body text-end">
                                    <textarea class="w-100" name="" id="" placeholder="Tell the people..."></textarea>
                                    <button>Post Comment</button>
                                </div>
                                <section class="row">
                                    <div class="col-12">
                                        <div class="card m-2">
                                            <div class="card-body"></div>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima repellat
                                                quo
                                                totam! Unde, architecto! </p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </section>
    </article>
</template>


<style lang="scss" scoped>
.active-event-img {
    width: 100%;
    height: 300px;

}
</style>