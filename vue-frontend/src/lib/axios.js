import Axios from 'axios'

const axios = Axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'content-type': 'application/json',
    },
    withCredentials: true,
    withXSRFToken: true
})

export default axios