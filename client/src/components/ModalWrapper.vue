<script setup>

</script>


<template>
    <!-- Button trigger modal -->
    <a type="button" class="" data-bs-toggle="modal" data-bs-target="#eventModal">
        Create an event
    </a>

    <!-- Modal -->
    <div class="modal fade" id="eventModal" tabindex="-1" aria-labelledby="eventModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="eventModalLabel">Create New Event</h1>
                    <a type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></a>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>