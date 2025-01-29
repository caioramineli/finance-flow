<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="secondary" outlined v-bind="attrs" v-on="on">
                Novo Contato
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5">Novo contato</span>
            </v-card-title>
            <v-card-text>
                <div>
                    <v-text-field v-model="formData.name" label="Nome" placeholder="Diego Penteado" outlined required />
                    <v-text-field v-model="formData.email" label="E-mail" placeholder="user@gmail.com" outlined
                        required />
                    <v-text-field v-model="formData.phone" label="Telefone" placeholder="(18) 99666-1215" outlined
                        required v-mask="phoneMask" />
                    <v-select v-model="formData.company" :items="items" label="Empresa" outlined required></v-select>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="dialog = false" :disabled="loading">Fechar</v-btn>
                <v-btn color="success" text @click="createContact" :loading="loading">
                    Cadastrar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import masksMixin from '@/mixins/masksMixin.js';

export default {
    mixins: [masksMixin],
    data: () => ({
        dialog: false,
        loading: false,
        formData: {
            name: '',
            email: '',
            phone: '',
            company: '',
        },
        items: ['InteligênciaBot', 'Kyra', 'MyContacts'],
    }),
    methods: {
        ...mapActions(['addNewContact']),
        async createContact() {
            if (this.loading) return;

            this.loading = true;

            try {
                const token = localStorage.getItem('token');
                const response = await this.$http.post('create-contact', this.formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                this.addNewContact(response.data.contact);

                this.formData = {
                    name: '',
                    email: '',
                    phone: '',
                    company: '',
                };

                this.dialog = false;
                this.$toast.success('Contato criado com sucesso!');
            } catch (error) {
                this.$toast.error(error.response?.data?.msg || 'Erro ao criar o contato.');
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
