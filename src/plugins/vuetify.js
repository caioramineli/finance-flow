import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
            light: {
                primary: colors.blue.darken2,
                secondary: colors.green.darken1,
                accent: colors.teal.base,
                error: colors.red.accent3,
                info: colors.lightBlue.base,
                success: colors.green.darken1,
                warning: colors.amber.darken2,
            },
            dark: {
                primary: colors.blue.lighten1,
                secondary: colors.green.lighten1,
                accent: colors.cyan.accent3,
                error: colors.deepOrange.accent4,
                info: colors.blue.lighten1,
                success: colors.green.accent3,
                warning: colors.amber.accent3,
            },
        },
    },
});

