import Vue from 'vue';
import Vuex from 'vuex';
import { jwtDecode } from 'jwt-decode';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
    },
    getters: {
        isLoggedIn: (state) => !!state.user,
        getUserName: (state) => state.user?.name || '',
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        clearUser(state) {
            state.user = null;
        },
    },
    actions: {
        setUserFromToken({ commit }, token) {
            try {
                const decoded = jwtDecode(token);
                commit('setUser', decoded)
                localStorage.setItem('token', token);
            } catch (error) {
                console.error('Token inválido:', error);
            }
        },
        restoreUser({ commit }) {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    commit('setUser', decoded);
                } catch (error) {
                    console.error('Erro ao restaurar usuário:', error);
                    localStorage.removeItem('token');
                }
            }
        },
        logoutUser({ commit }) {
            commit('clearUser');
            localStorage.removeItem('token');
        },
    }
});
