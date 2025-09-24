<script setup>
import UpcomingEvents from '@/components/UpcomingEvents.vue';




</script>

<template>
  <article class="container-fluid background-img flex-wrap align-content-end">
    <section class="row flex-wrap align-content-end">
      <div class="col-5 text-white mb-5 ms-5 pb-5 ps-5">
        <h1>Lorem ipsum dolor sit amet.</h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam vitae necessitatibus pariatur dolor veniam
        nihil, dolorem ipsum qui dolorum explicabo rerum eligendi vel expedita fuga ea culpa assumenda reiciendis
        voluptatibus!
      </div>
    </section>

  </article>
  <main class="container mt-5">
    <h3>How Tower Works</h3>
    <section class="row mt-2 justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5> <i class="mdi mdi-magnify"></i> Discover events you're interested in</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod odit quam nihil beatae laudantium.</p>
            <a href="">Discover events</a>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5> <i class="mdi mdi-plus"></i> Start an event to invite your friends</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod odit quam nihil beatae laudantium.</p>
            <a href="">Create an event</a>
          </div>
        </div>
      </div>
    </section>
  </main>
  <main class="container mt-5">
    <h3>Explore top catagories</h3>
    <section class="row justify-content-center mt-2">
      <div class="col-2 text-center">
        <div class="card">
          <div class="card-body p-0 m-0">
            <span class=""><i class="mdi mdi-all-inclusive"></i></span>
            <p>All</p>
          </div>
        </div>
      </div>
      <div class="col-2 text-center">
        <div class="card">
          <div class="card-body p-0 m-0">
            <span class=""><i class="mdi mdi-guitar-electric"></i></span>
            <p>Concerts</p>
          </div>
        </div>
      </div>
      <div class="col-2 text-center">
        <div class="card">
          <div class="card-body p-0 m-0">
            <span class=""><i class="mdi mdi-account-group"></i></span>
            <p>Conventions</p>
          </div>
        </div>
      </div>
      <div class="col-2 text-center">
        <div class="card">
          <div class="card-body p-0 m-0">
            <span class=""><i class="mdi mdi-soccer"></i></span>
            <p>Sports</p>
          </div>
        </div>
      </div>
      <div class="col-2 text-center">
        <div class="card">
          <div class="card-body p-0 m-0">
            <span class=""><i class="mdi mdi-monitor"></i></span>
            <p>Digital</p>
          </div>
        </div>
      </div>
    </section>
  </main>
  <section class="container mt-5">
    <h3>Explore top catagories</h3>
    <section class="row g-3 mt-2">
      <UpcomingEvents />
    </section>
  </section>
</template>

<style scoped lang="scss">
.background-img {
  background-image: url(https://images.unsplash.com/photo-1499540633125-484965b60031?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
  width: 100%;
  height: 30em;
  // object-fit: cover;
  // aspect-ratio: 1/1;
  background-size: cover;
  background-position: center;

}
</style>
