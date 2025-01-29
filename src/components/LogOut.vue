<template>
    <v-dialog v-model="dialogComputed" persistent max-width="400px">
        <template v-slot:activator="{ on, attrs }">
            <v-list-item v-bind="attrs" v-on="on">
                <v-list-item-icon>
                    <v-icon>mdi-export</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                    Sair
                </v-list-item-title>
                <LogOut :dialogProp.sync="dialog" />
            </v-list-item>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5">Sair da conta</span>
            </v-card-title>
            <v-card-text>
                <div>
                    <p>Você deseja realmente sair da conta?</p>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" text @click="closeDialog">Cancelar</v-btn>
                <v-btn color="error" text @click="logout">Sair da Conta</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        dialogProp: Boolean,
    },
    computed: {
        dialogComputed: {
            get() {
                return this.dialogProp;
            },
            set(value) {
                this.$emit('update:dialogProp', value);
            }
        }
    },
    methods: {
        closeDialog() {
            this.dialogComputed = false;
        },
        logout() {
            this.$store.dispatch('logoutUser')
            this.$router.push('/login');
        }
    }
};
</script>
