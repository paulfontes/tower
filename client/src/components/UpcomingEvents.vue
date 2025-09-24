<script setup>
import { AppState } from '@/AppState.js';
import { eventsService } from '@/services/EventsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const events = computed(() => AppState.towerEvent)

onMounted(() => getEvents())

async function getEvents() {
    try {

        await eventsService.getEvents()
    }
    catch (error) {
        Pop.error(error);
        logger.log("Couldn't get upcoming events!", error)
    }
}

</script>


<template>
    <div v-for="event in events" class="col-4">
        <RouterLink :to="{ name: 'Event' }">
            <div class="card">
                <div class="card-img-top">
                    <img :src="event.coverImg" alt="this is a picture of the event" class="img-fluid events-img">
                </div>
                <div class="card-body">
                    <b>{{ event.name }}</b>
                    <p class="text-success fw-medium mb-0">Hosted by {{ event.creator.name }}</p>
                    <p class="mb-0"> {{ event.startDate }} - {{ event.location }}</p>
                    <p class="mb-0">125 attending</p>
                </div>
            </div>
        </RouterLink>
    </div>
</template>


<style lang="scss" scoped>
.events-img {
    width: 100%;
    height: 200px;
    object-position: center;
    aspect-ratio: 1/1;
    object-fit: cover;
}
</style>