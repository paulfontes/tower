<script setup>
import { eventsService } from '@/services/EventsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { onMounted } from 'vue';



onMounted(() => getEvents)

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
    This is where upcoming events will go
</template>


<style lang="scss" scoped></style>