<script setup>
import { TowerEvent } from '@/models/TowerEvent.js';



const props = defineProps({
    event: { type: TowerEvent, required: true }
})


</script>


<template>
    <div class="col-4">
        <RouterLink :to="{ name: 'Event', params: { eventId: event.id } }">
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