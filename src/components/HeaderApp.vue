<template>
    <div>
        <v-app-bar app color="blue darken-3" dark>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>MyContacts</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-row class="d-flex justify-end align-center">
                <ChangeTheme />
                <h4 class="h-4 ma-2">
                    Olá, {{ userName }}
                </h4>
            </v-row>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list nav dense>
                <v-list-item-group v-model="group" active-class="blue--text text--darken-2 text--accent-4">
                    <v-list-item to="/" class="v-list-item">
                        <v-list-item-icon>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/account" class="v-list-item">
                        <v-list-item-icon>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Account</v-list-item-title>
                    </v-list-item>

                    <v-list-item v-if="$store.getters.getUserName !== ''" class="v-list-item" @click="logout">
                        <v-list-item-icon>
                            <v-icon>mdi-export</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Sair</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import ChangeTheme from './ChangeTheme.vue';

export default {
    components: {
        ChangeTheme
    },
    computed: {
        userName() {
            return this.$store.getters.getUserName.split(' ')[0] || 'Visitante';
        },
    },
    data: () => ({
        drawer: false,
        group: null,
    }),
    methods: {
        logout() {
            this.$store.dispatch('logoutUser')
            this.$router.push('/login');
        }
    }
};
</script>
