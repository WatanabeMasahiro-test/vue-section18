import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router/index'
import store from './store/index'

axios.defaults.baseURL = 'https://firestore.googleapis.com/v1/projects/vue-section17-11717/databases/(default)/documents';

const interceptorsRequest = axios.interceptors.request.use(
    config  => {
        return config;
    },
    error   => {
        return Promise.reject(error);
    },
);
const interceptorsResponse = axios.interceptors.response.use(
    response  => {
        return response;
    },
    error   => {
        return Promise.reject(error);
    },
);

axios.interceptors.request.eject(interceptorsRequest);
axios.interceptors.response.eject(interceptorsResponse);

store.dispatch('autoLogin');

createApp(App)
    .use(router)
    .use(store)
.mount('#app')
