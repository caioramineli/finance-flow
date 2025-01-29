<template>
    <v-container>
        <div class="d-flex justify-space-between">
            <h2>Meus Contatos</h2>
            <CreateContact />
        </div>

        <CardContacts />

    </v-container>
</template>

<script>
import CardContacts from '@/components/CardContacts.vue';
import CreateContact from '@/components/CreateContact.vue';

export default {
    components: {
        CardContacts,
        CreateContact,
    },
    name: 'HomePage',

};
</script>

<style></style>