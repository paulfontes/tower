<script setup>
import { computed, ref } from 'vue';
import ModalWrapper from './ModalWrapper.vue';
import { Pop } from '@/utils/Pop.js';
import { logger } from '@/utils/Logger.js';
import { eventsService } from '@/services/EventsService.js';
import { useRouter } from 'vue-router';
import { Modal } from 'bootstrap';
import { AppState } from '@/AppState.js';

const account = computed(() => AppState.account)

const router = useRouter()

const catagories = ['concert', 'convention', 'sport', 'digital']

const editableEventData = ref({
    name: '',
    description: '',
    coverImg: '',
    type: '',
    startDate: '',
    capacity: 0,
    location: ''

})

async function createEvent() {
    try {
        const event = await eventsService.createEvent(editableEventData.value)

        Modal.getInstance('#eventModal').hide()
        router.push({ name: 'Event', params: { eventId: event.id } })
    }
    catch (error) {
        Pop.error(error);
        logger.log('There was an error creating an event', error)
    }


}




</script>


<template>
    <ModalWrapper v-if="account">
        <form @submit.prevent="createEvent()">
            <section class="row p-5">
                <label for="event-name">Event Name</label>
                <input required v-model="editableEventData.name" type="text" id="event-name" name="event-name"
                    class="form-control" minlength="3" maxlength="50">
                <label for="event-location">Event Location</label>
                <input required v-model="editableEventData.location" type="text" id="event-location"
                    name="event-location" class="form-control" minlength="1" maxlength="500">
                <label for="event-type">Event Type</label>
                <select v-model="editableEventData.type" class="form-select" aria-label="Default select example"
                    id="event-type" name="event-type" required>
                    <option selected disabled value="">Select a category</option>
                    <option v-for="category in catagories" :key="category" :value="category">
                        {{ category }}
                    </option>
                </select>
                <div class="col-6">
                    <label for="event-start-date">Start Date</label>
                    <input required v-model="editableEventData.startDate" type="date" id="event-start-date"
                        name="event-start-date" class="form-control">
                </div>
                <div class="col-6">
                    <label for="event-capacity">Capacity</label>
                    <input v-model="editableEventData.capacity" type="number" required id="event-capacity"
                        name="event-capacity" class="form-control" min="1" max="5000">
                </div>
                <label for="event-img">Image URL</label>
                <input v-model="editableEventData.coverImg" required type="url" id="event-img" name="event-img"
                    class="form-control" maxlength="1000">
                <label for="event-description">Event Description</label>
                <textarea v-model="editableEventData.description" required type="text" id="event-description"
                    name="event-description" class="form-control" placeholder="Tell us more about your event..."
                    minlength="15" maxlength="1000"></textarea>
                <div class="text-end mt-5">
                    <button type="submit" class="btn btn-outline-primary w-50" data-bs-dismiss='modal'>Create
                        Event</button>
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