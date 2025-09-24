<script setup>
import { AppState } from '@/AppState.js';
import { computed, ref } from 'vue';


const events = computed(() => {

    if (selectedCategory.value == 'all') {
        return AppState.towerEvent
    }

    return AppState.towerEvent.filter(event => event.type == selectedCategory.value)
})

const selectedCategory = ref('all')

const categories = [
    {
        name: 'all'
    },
    {
        name: 'concerts'
    },
    {
        name: 'conventions'
    },
    {
        name: 'sports'
    },
    {
        name: 'digital'
    },
]

</script>


<template>
    <section class="row justify-content-center mt-2">
        <div v-for="category in categories" :key="category.name" class="col-2 text-center">
            <div class="card">
                <div @click="selectedCategory = category.name" class="card-body p-0 m-0" role="button">
                    <b class="text-capitalize">{{ category.name }}</b>
                </div>
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped></style>