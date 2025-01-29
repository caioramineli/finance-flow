<template>
    <div>
        <p v-if="!loading && contacts.length === 0">Nenhum contato cadastrado!</p>

        <v-progress-linear class="mt-1" v-if="loading" indeterminate color="primary">
        </v-progress-linear>

        <v-row class="mt-1">
            <v-col v-for="contact in contacts" :key="contact.id" cols="12" sm="6" md="4">
                <v-card>
                    <v-card-title class="d-flex justify-space-between teal darken-1 white--text">
                        <span>{{ contact.name }}</span>
                        <div class="btnOptions">
                            <BtnOptions :contact="contact" />
                        </div>
                    </v-card-title>
                    <v-card-text class="mt-2">
                        <p><strong>Email: </strong>{{ contact.email }}</p>
                        <p><strong>Telefone: </strong>{{ contact.phone }}</p>
                        <p><strong>Empresa: </strong>{{ contact.company }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>


<script>
import BtnOptions from './BtnOptions.vue';

export default {
    data: () => ({
        error: null,
    }),
    components: {
        BtnOptions,
    },
    computed: {
        contacts() {
            return this.$store.state.contacts;
        },
        loading() {
            return this.$store.state.loadingContacts;
        }
    },
    created() {
        this.$store.dispatch('fetchContactsData');
    },
};
</script>

<style>
.v-application p {
    margin-bottom: 0px;
}
</style>
