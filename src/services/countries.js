import { fetcher } from '@/utils'
import axios from 'axios'
import useSWR, { mutate } from 'swr'

const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT

export function useCountries(page = 0, limit = 20, text = null) {
  if (text === '') text = null
  const { data, error } = useSWR(
    `${ENDPOINT}/countries?page=${page}&limit=${limit}${
      text ? `&text=${text}` : ''
    }`,
    fetcher
  )
  return {
    countries: data && data.data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useTotalCountries(limit) {
  const { data, error } = useSWR(
    `${ENDPOINT}/country/pages?limit=${limit}`,
    fetcher
  )
  return {
    total: data && data.data,
    isLoading: !error && !data,
    isError: error,
  }
}

export async function addCountry(name, image) {
  try {
    const res = await axios.post(`${ENDPOINT}/country/add`, { name, image })
    return { success: true, data: res.data }
  } catch (error) {
    return { success: false, error }
  }
}

export async function updateCountry(id, name, image) {
  try {
    const res = await axios.post(`${ENDPOINT}/country/edit`, {
      id,
      name,
      image,
    })
    return { success: true, data: res.data }
  } catch (error) {
    return { success: false, error }
  }
}

export async function deleteCountry(id) {
  try {
    const res = await axios.post(`${ENDPOINT}/country/delete`, { id })
    return { success: true, data: res.data }
  } catch (error) {
    return { success: false, error }
  }
}

export const mutateCountries = (page = 0, limit = 10, text = null) => {
  mutate(
    `${ENDPOINT}/countries?page=${page}&limit=${limit}${
      text ? `&text=${text}` : ''
    }`
  )
}
