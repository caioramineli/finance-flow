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
                        <v-list-item-title>Tela Inicial</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/account" class="v-list-item">
                        <v-list-item-icon>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Minha Conta</v-list-item-title>
                    </v-list-item>
                    <template v-if="$store.getters.getUserName !== ''">
                        <LogOut :dialogProp.sync="dialog" />
                    </template>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import ChangeTheme from './ChangeTheme.vue';
import LogOut from './LogOut.vue';

export default {
    components: {
        ChangeTheme,
        LogOut,
    },
    computed: {
        userName() {
            return this.$store.getters.getUserName.split(' ')[0] || 'Visitante';
        },
    },
    data: () => ({
        drawer: false,
        group: null,
        dialog: false
    }),
};
</script>
