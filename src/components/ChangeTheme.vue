<template>
    <v-switch v-model="darkMode" hide-details inset color="secondary"></v-switch>
</template>

<script>
export default {
    data() {
        return {
            darkMode: localStorage.getItem('darkMode') !== null
                ? JSON.parse(localStorage.getItem('darkMode'))
                : true
        };
    },
    watch: {
        darkMode(value) {
            this.$vuetify.theme.dark = value;
            localStorage.setItem('darkMode', JSON.stringify(value));
        },
    },
    created() {
        this.$vuetify.theme.dark = this.darkMode;
    },
};
</script>
