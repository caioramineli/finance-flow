import Vue from 'vue';
import Vuex from 'vuex';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        contacts: [],
        loadingContacts: false,
    },
    getters: {
        getUserName: (state) => state.user?.name || '',
        getUserId: (state) => state.user?.id,
        getContacts: (state) => state.contacts,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        clearUser(state) {
            state.user = null;
        },
        setContacts(state, contacts) {
            state.contacts = contacts;
        },
        addContact(state, contact) {
            state.contacts.push(contact);
        },
        setLoadingContacts(state, loadingContacts) {
            state.loadingContacts = loadingContacts
        }
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
        updateContacts({ commit }, contacts) {
            commit('setContacts', contacts);
        },
        addNewContact({ commit }, contact) {
            commit('addContact', contact);
        },
        async fetchContactsData({ commit }) {
            commit('setLoadingContacts', true);
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get('https://backend-tech-insights-production.up.railway.app/get-contacts-by-user', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                commit('setContacts', response.data);
            } catch (error) {
                console.error(error);
            } finally {
                commit('setLoadingContacts', false);
            }
        },
    }
});
