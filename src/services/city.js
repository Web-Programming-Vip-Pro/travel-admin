import { fetcher } from '@/utils'
import axios from 'axios'
import useSWR, { mutate } from 'swr'
const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT

export function useCities(page = 0, limit = 20, text = null) {
  if (text === '') text = null
  const { data, error } = useSWR(
    `${ENDPOINT}/cities?page=${page}&limit=${limit}${
      text ? `&text=${text}` : ''
    }`,
    fetcher
  )
  return {
    cities: data && data.data,
    isLoading: !error && !data,
    error,
  }
}

export function useCitiesByCountry(countryId) {
  const { data, error } = useSWR(
    `${ENDPOINT}/country/cities?country_id=${countryId}`,
    fetcher
  )
  return {
    cities: data && data.data,
    isLoading: !error && !data,
    error,
  }
}

export function useTotalCities(limit = 20) {
  const { data, error } = useSWR(
    `${ENDPOINT}/city/pages?limit=${limit}`,
    fetcher
  )
  return {
    total: data && data.data,
    isLoading: !error && !data,
    error,
  }
}

export async function addCity(city) {
  try {
    const response = await axios
      .post(`${ENDPOINT}/city/add`, city)
      .then((res) => res.data)
    return { success: true, message: response.data }
  } catch (error) {
    return { success: false, message: error.response.data }
  }
}

export async function deleteCity(id) {
  try {
    const response = await axios
      .post(`${ENDPOINT}/city/delete`, { id })
      .then((res) => res.data)
    return { success: true, message: response.data }
  } catch (error) {
    return { success: false, message: error.response.data }
  }
}

export async function updateCity(id, city) {
  try {
    const response = await axios
      .post(`${ENDPOINT}/city/edit`, { id, ...city })
      .then((res) => res.data)
    return { success: true, message: response.data }
  } catch (error) {
    return { success: false, message: error.response.data }
  }
}

export function mutateCities(page = 0, limit = 20, text = null) {
  if (text === '') text = null
  mutate(
    `${ENDPOINT}/cities?page=${page}&limit=${limit}${
      text ? `&text=${text}` : ''
    }`
  )
}
export function mutateTotalCities(limit = 20) {
  mutate(`${ENDPOINT}/city/pages?limit=${limit}`)
}
