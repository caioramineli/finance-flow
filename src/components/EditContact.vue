<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn fab dark x-small color="green" v-bind="attrs" v-on="on">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5">Atualizar Contato</span>
            </v-card-title>
            <v-card-text>
                <div>
                    <v-text-field v-model="localContact.name" label="Nome" placeholder="Diego Penteado" outlined
                        required />
                    <v-text-field v-model="localContact.email" label="E-mail" placeholder="user@gmail.com" outlined
                        required />
                    <v-text-field v-mask="phoneMask" v-model="localContact.phone" label="Telefone"
                        placeholder="(18) 99666-1215" outlined required />
                    <v-select v-model="localContact.company" :items="items" label="Empresa" outlined required />
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="dialog = false" :disabled="loading">Fechar</v-btn>
                <v-btn color="success" text @click="editContact" :loading="loading">Atualizar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import masksMixin from '@/mixins/masksMixin.js';

export default {
    props: {
        contact: Object,
    },
    mixins: [masksMixin],
    data: () => ({
        dialog: false,
        items: ['InteligênciaBot', 'Kyra', 'MyContacts'],
        localContact: {},
        loading: false,
    }),
    watch: {
        contact: {
            immediate: true,
            handler(newValue) {
                if (newValue) {
                    this.localContact = { ...newValue };
                }
            },
        },
    },
    methods: {
        async editContact() {
            if (this.loading) return;

            this.loading = true;
            try {
                const token = localStorage.getItem('token');
                await this.$http.put('update-contact', this.localContact, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                this.$store.dispatch('fetchContactsData');
                this.dialog = false;
                this.$toast.success('Contato atualizado com sucesso!');
            } catch (error) {
                this.$toast.error(error.response?.data?.msg || 'Erro ao atualizar contato.');
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
