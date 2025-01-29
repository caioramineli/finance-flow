<template>
    <v-container class="d-flex justify-center align-center containerLogin">
        <v-card class="pa-6" width="500">
            <v-form @submit.prevent="fetchData">
                <h4 class="text-h4 mb-4">Login</h4>

                <v-text-field v-model="formData.email" label="E-mail" placeholder="user@gmail.com" outlined required />

                <v-text-field v-model="formData.password" outlined
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'"
                    label="Senha" required @click:append="showPassword = !showPassword" />

                <v-btn type="submit" block large :loading="loading" :disabled="loading" color="primary">
                    Fazer Login
                </v-btn>

                <p class="createAccount">
                    Não tem conta?
                    <router-link class="green--text text--darken-1 font-weight-bold"
                        to="/register">Cadastrar-se</router-link>
                </p>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        formData: {
            email: "",
            password: ""
        },
        showPassword: false,
        loading: false,
        error: null,
    }),
    methods: {
        async fetchData() {
            this.loading = true;

            try {
                const response = await this.$http.post('/auth', this.formData);
                const { token } = response.data;
                this.$store.dispatch('setUserFromToken', token)
                this.$router.push('/');
            } catch (err) {

                const errorMessage = err.response?.data?.msg;
                this.$toast.error(errorMessage);
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style>
.containerLogin {
    height: 100%;
}

.containerLogin .createAccount {
    display: flex;
    justify-content: center;
    margin-top: 1.2rem;
    font-size: 1rem;
    gap: 4px;
    line-height: normal;
}

.containerLogin .createAccount span {
    font-weight: 500;
}
</style>
