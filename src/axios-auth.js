import axios from 'axios'

const instance = axios.create({
    baseURL:
        'https://firestore.googleapis.com/v1/projects/vue-section17-11717/databases/(default)/documents'
})

// instance.defaults.headers.common

export default instance