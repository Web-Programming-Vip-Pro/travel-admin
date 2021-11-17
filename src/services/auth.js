import useSWR, { mutate } from 'swr'
import axios from 'axios'
import { getCookie, removeCookie, setCookie } from '@/utils/cookies'

const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT

const fetcher = async (url) => {
  const response = await axios
    .get(url, { headers: { Authorization: 'Bearer ' + getCookie('token') } })
    .then((res) => res.data.data)
  if (response.user.role !== '2') {
    const err = new Error('You are not authorized to access this page')
    err.response = {
      data: { data: 'You are not authorized to access this page' },
    }
    throw err
  }
  return response
}

export function useVerifyUser() {
  const { data, error } = useSWR(`${ENDPOINT}/user`, fetcher)
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export async function login({ email, password }) {
  try {
    const response = await axios
      .post(`${ENDPOINT}/login`, { email, password })
      .then((res) => res.data)
    const token = response.data
    setCookie('token', token)
    await fetcher(`${ENDPOINT}/user`)
    await mutate(`${ENDPOINT}/user`)
    return { success: true, message: null }
  } catch (err) {
    removeCookie('token')
    return { success: false, message: err.response.data.data }
  }
}
