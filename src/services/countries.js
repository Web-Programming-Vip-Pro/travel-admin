import { fetcher } from '@/utils'
import axios from 'axios'
import useSWR, { mutate } from 'swr'

const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT

export function useCountries() {
  const { data, error } = useSWR(`${ENDPOINT}/countries`, fetcher)
  return {
    countries: data && data.data,
    isLoading: !error && !data,
    isError: error,
  }
}

export async function addCountry(name) {
  try {
    const res = await axios.post(`${ENDPOINT}/country/add`, { name })
    mutate(`${ENDPOINT}/countries`)
    return { success: true, data: res.data }
  } catch (error) {
    return { success: false, error }
  }
}

export async function updateCountry(id, name) {
  try {
    const res = await axios.post(`${ENDPOINT}/country/edit`, { id, name })
    mutate(`${ENDPOINT}/countries`)
    return { success: true, data: res.data }
  } catch (error) {
    return { success: false, error }
  }
}

export async function deleteCountry(id) {
  try {
    const res = await axios.post(`${ENDPOINT}/country/delete`, { id })
    mutate(`${ENDPOINT}/countries`)
    return { success: true, data: res.data }
  } catch (error) {
    return { success: false, error }
  }
}
