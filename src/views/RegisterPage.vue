<template>
    <v-container class="d-flex justify-center align-center containerRegister">
        <v-card class="pa-6" width="500">
            <v-form @submit.prevent="fetchData" ref="form">
                <h4 class="text-h4 mb-4">Cadastro</h4>

                <v-text-field v-model="formData.name" label="Nome" placeholder="Diego Penteado" outlined required
                    color="green" />

                <v-text-field v-model="formData.email" label="E-mail" placeholder="user@gmail.com" outlined required
                    color="green" />

                <v-text-field v-model="formData.password" outlined
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" color="green"
                    :type="showPassword ? 'text' : 'password'" label="Senha" required
                    @click:append="showPassword = !showPassword" />

                <v-btn type="submit" width="100%" large :loading="loading" :disabled="loading" color="green"
                    @click="loader = 'loading'">
                    Cadastrar-se
                </v-btn>

                <p class="createAccount">
                    Já tem conta?
                    <router-link class="blue--text text--darken-1 font-weight-bold" to="/login">
                        Faça o Login
                    </router-link>
                </p>

            </v-form>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        formData: {
            name: "",
            email: "",
            password: ""
        },

        showPassword: false,
        loading: false,
    }),
    methods: {
        async fetchData() {
            this.loading = true;

            try {
                await this.$http.post('user-register', this.formData);

                const responseLogin = await this.$http.post('auth', {
                    email: this.formData.email,
                    password: this.formData.password
                });

                const { token } = responseLogin.data;
                localStorage.setItem('token', token);

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
.containerRegister {
    height: 100%;
}

.containerRegister .createAccount {
    display: flex;
    justify-content: center;
    margin-top: 1.2rem;
    font-size: 1rem;
    gap: 4px;
    line-height: normal;
}
</style>
