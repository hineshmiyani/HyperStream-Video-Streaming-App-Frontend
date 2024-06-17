import ENV from '@/env'
import { getFromLocalStorage } from '@/lib/utils/storage'
import axios from 'axios'

const api = axios.create({
  baseURL: ENV.API_BASE_URL,
})

api.interceptors.request.use(
  (config) => {
    // Get the access token from localStorage
    const accessToken = typeof window !== 'undefined' ? getFromLocalStorage('accessToken') : ''

    // If the access token exists, set it in the request headers
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => {
    const { data } = response
    return data
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { data } = error.response

    console.log(error.toJSON())
    return Promise.reject(data)
  }
)

export default api
