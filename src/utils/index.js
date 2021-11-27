import axios from 'axios'
import dayjs from 'dayjs'

export const fetcher = (...args) => axios.get(...args).then((res) => res.data)

export const shorten = (str, len = 20) => {
  if (str.length > len) {
    return str.slice(0, len) + '...'
  }
  return str
}

export const formatDate = (date) => dayjs(date).format('DD/MM/YYYY')

export const isAdmin = (user) => {
  if (user) {
    return parseInt(user.role) === 2
  }
  return false
}
