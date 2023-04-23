import { createApp } from 'vue'
import Vuex from 'vuex'
import axios from '../axios-auth'
import router from '../router/index'
import axiosRefresh from '@/axios-refresh' 


createApp(Vuex)

export default new Vuex.Store({
    state: {
        idToken: null
    },
    getters: {
        idToken: state => state.idToken
    },
    mutations: {
        updateIdToken(state, idToken) {
            state.idToken = idToken;
        }
    },
    actions: {
        autoLogin({ commit }) {
            const idToken = localStorage.getItem('idToken');
            if (!idToken) return;
            const now           = new Date();
            const expiryTimeMs  = localStorage.getItem('expiryTimeMs');
            const isExpired     = now.getTime() >= expiryTimeMs;
            const refreshToken  = localStorage.getItem('refreshToken');
            if (isExpired) {
                this.dispatch('refreshIdToken', refreshToken);
            } else {
                const expiresInMs = expiryTimeMs - now.getTime();
                setTimeout(() => {
                    this.dispatch('refreshIdToken', refreshToken);
                }, expiresInMs);
                commit('updateIdToken', idToken);
            }
        },
        login({ dispatch }, authData) {
            axios
                .post(
                    '/accounts:signInWithPassword?key=AIzaSyBc3z4x6ytnfcuBWjGxC6IQLOWUVQmSl6s',
                    {
                        email               : authData.email,
                        password            : authData.password,
                        returnSecureToken   : true,
                    }
                ).then(response => {
                    dispatch('setAuthData', {
                        idToken         : response.data.idToken,
                        expiresIn       : response.data.expiresIn,
                        refreshToken    : response.data.refreshToken,
                    });
                    router.push('/');
                });
        },
        logout({ commit }) {
            commit('updateIdToken', null);
            localStorage.removeItem('idToken');
            localStorage.removeItem('expiryTimeMs');
            localStorage.removeItem('refreshToken');
            router.replace('/login');
        },
        refreshIdToken({ dispatch }, refreshToken) {
            axiosRefresh.post(
                '/token?key=AIzaSyBc3z4x6ytnfcuBWjGxC6IQLOWUVQmSl6s',
                {
                    grant_type      : 'refresh_token',
                    refresh_tolen   : refreshToken,
                }
            ).then(response => {
                dispatch('setAuthData', {
                    idToken         : response.data.id_token,
                    expiresIn       : response.data.expires_in,
                    refreshToken    : response.data.refresh_token,
                });
            })
        },
        register({ dispatch }, authData) {
            axios
                .post(
                    '/accounts:signUp?key=AIzaSyBc3z4x6ytnfcuBWjGxC6IQLOWUVQmSl6s',
                    {
                        email               : authData.email,
                        password            : authData.password,
                        returnSecureToken   : true,
                    }
                ).then(response => {
                    // commit('updateIdToken', response.data.idToken);
                    // console.log(response);
                    dispatch('setAuthData', {
                        idToken         : response.data.idToken,
                        expiresIn       : response.data.expiresIn,
                        refreshToken    : response.data.refreshToken,
                    });
                    router.push('/');
                });
        },
        setAuthData({ commit, dispatch }, authData) {
            const now           = new Date();
            const expiryTimeMs  = now.getTime() + authData.expiresIn * 1000;
            commit('updateIdToken', authData.idToken);
            // console.log(response);
            localStorage.setItem('idToken', authData.idToken);
            localStorage.setItem('expiryTimeMs', expiryTimeMs);
            localStorage.setItem('refreshToken', authData.refreshToken);
            setTimeout(() => {
                dispatch('refreshIdToken', authData.refreshToken);
            }, authData.expiresIn * 1000);
        },
    }
})