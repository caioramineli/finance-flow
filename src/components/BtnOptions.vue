<template>
    <div class="containerBtns">
        <DeleteContact :contact="contact" />
        <EditContact :contact="contact" />
    </div>
</template>

<script>
import DeleteContact from './DeleteContact.vue';
import EditContact from './EditContact.vue';

export default {
    props: {
        contact: Object,
    },
    components: {
        EditContact,
        DeleteContact,
    },
    data: () => ({
        open: false,
        transition: 'slide-y-reverse-transition',
    }),
};
</script>

<style scoped>
.containerBtns {
    display: flex;
    align-items: center;
    gap: 12px;
}
</style>
