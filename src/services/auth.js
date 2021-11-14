import useSWR, { mutate } from 'swr'
import axios from 'axios'
import { getCookie, setCookie } from '@/utils/cookies'

const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT

export function useVerifyUser() {
  const fetcher = (url) =>
    axios
      .get(url, { headers: { Authorization: 'Bearer ' + getCookie('token') } })
      .then((res) => res.data)

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
    mutate(`${ENDPOINT}/user`)
    return { success: true, message: null }
  } catch (err) {
    return { success: false, message: err.response.data.data }
  }
}
