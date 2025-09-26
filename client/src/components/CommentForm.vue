<script setup>
import { commentsService } from '@/services/CommentsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { ref } from 'vue';
import { useRoute } from 'vue-router';




const route = useRoute()

const editableComments = ref({
    body: '',
    eventId: route.params.eventId
})


async function createComment() {
    try {
        await commentsService.createComment(editableComments.value)
        editableComments.value.body = ''
    }
    catch (error) {
        Pop.error(error);
        logger.error('Could not create comment!', error)
    }
}

</script>


<template>
    <form @submit.prevent="createComment()">
        <div class="col-12">
            <p>See what folks are saying...</p>
            <div class="card">
                <div class="card-body">
                    <label for="comment-body"></label>
                    <textarea v-model="editableComments.body" type="text" class="w-100" id="comment-body"
                        name="comment-body"></textarea>
                    <button type="submit" class="btn btn-outline-success">Post Comment</button>
                </div>
            </div>
        </div>
    </form>
</template>


<style lang="scss" scoped></style>