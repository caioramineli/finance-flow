<template>
    <v-container>
        <h2>Dados do Usuário</h2>
        <span>{{ error }}</span>
        <v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>

        <div v-else>
            <v-card class="pa-2 mt-4">
                <v-card-title>
                    Nome: <strong class="ml-2">{{ user.name }}</strong>
                </v-card-title>
                <v-card-subtitle>
                    Email: <strong>{{ user.email }}</strong>
                </v-card-subtitle>
            </v-card>
        </div>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            user: {},
            loading: true,
            error: null,
        };
    },
    mounted() {
        this.fetchUserData();
    },
    methods: {
        async fetchUserData() {
            try {
                const token = localStorage.getItem('token');
                const response = await this.$http.get('get-user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.user = response.data
            } catch (err) {
                this.error = 'Erro ao carregar os dados do usuário.';
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style></style>