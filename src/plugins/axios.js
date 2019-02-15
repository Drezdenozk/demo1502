const axios = require('axios')
import {
  winstonError,
  winstonInfo,
} from './logger'
const axiosRetry = require('axios-retry')
import api from './env'

const axiosInstance = axios.create({
  withCredentials: true,
})

axiosRetry(axiosInstance, {
  retries: 2
})

const dev = (process.env.NODE_ENV === 'development')
// разблокировать интерсептор когда понадобится, донастроить winston
  axiosInstance.interceptors.response.use((res) => {
    winstonInfo.info(`${res.status || 200} - ${res.config.url} - ${res.config.method}`)
  if (dev && !!api.DEBUG === true) {
    // console.warn('\x1b[35m%s\x1b[0m: ', `AXIOS ${res.config.method} ${res.config.url} --> ${res.status ? res.status : 'no Response'}`)
    // console.warn(`request: ${res.config.data ? (typeof res.config.data === 'string' ? res.config.data : JSON.stringify(res.config.data)) : null}`)
    // console.warn(`response: ${res.data ? JSON.stringify(res.data) : {}}`)
    // console.warn('\x1b[35m%s\x1b[0m: ', `<-- AXIOS`)
  }
    return res
  }, (error) => {
    winstonError.error(`${error.response ? error.response.status : 'no Response'} - ${error.response && error.response.data ? JSON.stringify(error.response.data) : 'no Response'} - ${error.config.url} - ${error.config.method}`)
    if (dev && !!api.DEBUG === true) {
      // console.error('\x1b[35m%s\x1b[0m: ', `AXIOS ${error.config.method} ${error.config.url} --> ${error.response ? error.response.status : 'no Response'}`)
      // console.error(`request: ${error.config.data ? (typeof error.config.data === 'string' ? error.config.data : JSON.stringify(error.config.data)) : null}`)
      // console.error(`response: ${error.response && error.response.data ? JSON.stringify(error.response.data) : 'no Response'}`)
      // console.error('\x1b[35m%s\x1b[0m: ', `<-- AXIOS`)
    }
    return Promise.reject(error)
  })

module.exports = axiosInstance
