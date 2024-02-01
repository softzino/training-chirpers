import Axios from 'axios'

const axios = Axios.create({
    baseURL: import.meta.env.BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true
})

export default axios