import axios from 'axios'
import { fetcher } from '@/utils'
import useSWR, { mutate } from 'swr'

const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT

export function usePlaces(
  page = 0,
  limit = 20,
  type = 0,
  order = 'recent',
  text = null,
  author_id = -1
) {
  const url = `${ENDPOINT}/places?page=${page}&limit=${limit}&type=${type}&author_id=${author_id}&order=${order}${
    text ? `&text=${text}` : ''
  }`
  const { data, error } = useSWR(url, fetcher)
  return {
    places: data && data.data,
    isLoading: !error && !data,
    error,
  }
}

export function usePlace(id) {
  const { data, error } = useSWR(`${ENDPOINT}/place?id=${id}`, fetcher)
  return {
    place: data && data.data,
    isLoading: !error && !data,
    error,
  }
}

export function usePlacePages(
  type = -1,
  limit = 20,
  text = null,
  author_id = -1
) {
  const { data, error } = useSWR(
    `${ENDPOINT}/place/pages?type=${type}&limit=${limit}&author_id=${author_id}${
      text ? `&text=${text}` : ''
    }`,
    fetcher
  )
  return {
    totalPages: data && data.data,
    isLoading: !error && !data,
    error,
  }
}

export async function addPlace(place) {
  try {
    const response = await axios.post(`${ENDPOINT}/place/add`, place)
    return { success: true, message: response.data }
  } catch (error) {
    return { success: false, message: error }
  }
}

export async function editPlace(place) {
  try {
    const response = await axios.post(`${ENDPOINT}/place/edit`, place)
    return { success: true, message: response.data }
  } catch (error) {
    return { success: false, message: error }
  }
}

export async function deletePlace(id) {
  try {
    const response = await axios.post(`${ENDPOINT}/place/delete`, { id })
    return { success: true, message: response.data }
  } catch (error) {
    return { success: false, message: error }
  }
}

export async function mutatePlaces(
  page = 0,
  limit = 20,
  type = 0,
  order = 'recent',
  text = null
) {
  const url = `${ENDPOINT}/places?page=${page}&limit=${limit}&type=${type}&order=${order}${
    text ? `&text=${text}` : ''
  }`
  mutate(url)
}

export function getPlaceType(type) {
  type = parseInt(type)
  switch (type) {
    case 0:
      return 'Stay'
    case 1:
      return 'Explore'
    default:
      return 'Food & Drink'
  }
}

export function getPlaceStatus(status) {
  status = parseInt(status)
  switch (status) {
    case 0:
      return 'Pending'
    case 1:
      return 'Approved'
    case 2:
      return 'Rejected'
    default:
      return 'Pending'
  }
}
