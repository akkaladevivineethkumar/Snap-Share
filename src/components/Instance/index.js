import axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create()
instance.interceptors.request.use(
  config => {
    const authToken = Cookies.get('jwt_token')
    config.headers.Authorization = `Bearer ${authToken}`
    return config
  },
  error => error,
)

export default instance
