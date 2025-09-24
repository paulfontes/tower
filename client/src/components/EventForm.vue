<script setup>
import { ref } from 'vue';
import ModalWrapper from './ModalWrapper.vue';
import { Pop } from '@/utils/Pop.js';
import { logger } from '@/utils/Logger.js';
import { eventsService } from '@/services/EventsService.js';


const editableEventData = ref({
    name: '',
    description: '',
    coverImg: '',
    type: '',
    startDate: '',
    capacity: 0,

})

async function createEvent() {
    try {
        await eventsService.createEvent()
    }
    catch (error) {
        Pop.error(error);
        logger.log('There was an error creating an event', error)
    }
}


</script>


<template>
    <ModalWrapper>
        <form @submit.prevent="createEvent()">
            <section class="row p-5">
                <label for="event-img">Event Name</label>
                <input v-model="editableEventData.name" type="text" id="event-img" name="event-img" class="form-control"
                    minlength="3" maxlength="50">
                <label for="event-img">Event Type</label>
                <input v-model="editableEventData.type" type="text" id="event-img" name="event-img"
                    class="form-control">
                <div class="col-6">
                    <label for="event-img">Start Date</label>
                    <input v-model="editableEventData.startDate" type="date" id="event-img" name="event-img"
                        class="form-control">
                </div>
                <div class="col-6">
                    <label for="event-img">Capacity</label>
                    <input v-model="editableEventData.capacity" type="number" id="event-img" name="event-img"
                        class="form-control" min="1" max="5000">
                </div>
                <label for="event-img">Image URL</label>
                <input v-model="editableEventData.coverImg" type="url" id="event-img" name="event-img"
                    class="form-control" maxlength="1000">
                <label for="event-img">Event Description</label>
                <textarea v-model="editableEventData.description" type="text" id="event-img" name="event-img"
                    class="form-control" placeholder="Tell us more about your event..." minlength="15"
                    maxlength="1000"></textarea>
                <div class="text-end mt-5">
                    <button type="submit" class="btn btn-outline-primary w-50">Create Event</button>
                </div>
            </section>
        </form>
    </ModalWrapper>
</template>


<style lang="scss" scoped>
textarea {
    width: 100%;
    height: 200px;
}
</style>