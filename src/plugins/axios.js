import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'https://backend-tech-insights-production.up.railway.app/'
// axios.defaults.baseURL = 'http://localhost:5000/'

Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios
    }
})