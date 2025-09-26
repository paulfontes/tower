<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { Pop } from '@/utils/Pop.js';
import { logger } from '@/utils/Logger.js';
import { ticketsService } from '@/services/TicketsService.js';
import UpcomingEvents from '@/components/UpcomingEvents.vue';


const account = computed(() => AppState.account)
const ticketEvents = computed(() => AppState.ticketEvents)

onMounted(() => getMyEvents())


async function getMyEvents() {
  try {
    await ticketsService.getMyTicketEvents()
  }
  catch (error) {
    Pop.error(error);
    logger.log('Cant get your events!', error)
  }
}

async function deleteTicket(ticketId) {
  const confirmed = await Pop.confirm('Are you sure you no longer want this ticket?')

  if (!confirmed) {
    return
  }


  try {
    await ticketsService.deleteTicket(ticketId)
  }
  catch (error) {
    Pop.error(error);
    logger.log('ticket could not delete', error)
  }
}
</script>

<template>
  <div class="about text-center">
    <div v-if="account">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
      <div class="container-fluid">
        <section class="row">
          <div v-for="ticket in ticketEvents" :key="ticket.id" class="col-md-4 d-flex justify-content-center g-2">
            <UpcomingEvents :event="ticket.event" />
            <div>
              <button @click="deleteTicket(ticket.id)" class="btn btn-outline-pink">Leave</button>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
