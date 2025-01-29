<template>
    <v-dialog v-model="dialog" persistent max-width="400px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn fab dark x-small color="error" v-bind="attrs" v-on="on">
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5">Excluir contato?</span>
            </v-card-title>
            <v-card-text>
                <div>
                    <p><strong>Nome: </strong>{{ contact.name }}</p>
                    <p><strong>Email: </strong>{{ contact.email }}</p>
                    <p><strong>Telefone: </strong>{{ contact.phone }}</p>
                    <p><strong>Empresa: </strong>{{ contact.company }}</p>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" text @click="dialog = false" :disabled="loading">Fechar</v-btn>
                <v-btn color="error" text @click="deleteContact" :loading="loading">Excluir</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

export default {
    props: {
        contact: Object
    },
    data: () => ({
        dialog: false,
        items: ['InteligênciaBot', 'Kyra', 'MyContacts'],
        loading: false
    }),
    methods: {
        async deleteContact() {
            if (this.loading) return;

            this.loading = true;
            try {
                const token = localStorage.getItem('token');

                await this.$http.delete(`delete-contact/${this.contact._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                this.$store.dispatch('fetchContactsData');
                this.dialog = false;
                this.$toast.success('Contato excluído com sucesso!');
            } catch (error) {
                this.$toast.error(error.response?.data?.msg || 'Erro ao excluir contato.');
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
