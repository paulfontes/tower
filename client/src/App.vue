<script setup>
import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router';

</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <RouterView />
  </main>
  <footer class=" text-center">
    Made with Blood Sweat and Tears <i class="mdi mdi-water text-pink"></i> by Paul
  </footer>
</template>

<style lang="scss"></style>
