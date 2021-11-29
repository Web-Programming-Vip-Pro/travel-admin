import useSWR, { mutate } from 'swr'
import axios from 'axios'
import { fetcher } from '@/utils'
const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT

export function useReviews(
  page = 0,
  limit = 10,
  agency_id = -1,
  order = 'recent'
) {
  const { data, error } = useSWR(
    `${ENDPOINT}/reviews?page=${page}&limit=${limit}&agency_id=${agency_id}&order=${order}`,
    fetcher
  )
  const reviews = data && data.data.reviews
  const totalPages = data && data.data.total
  return { reviews, isLoading: !error && !data, error, totalPages }
}

export async function deleteReview(id) {
  try {
    const response = await axios.post(`${ENDPOINT}/reviews`, { id })
    return { success: true, message: response.data }
  } catch (error) {
    return { success: false, message: error.response.data }
  }
}

export function mutateReviews(page = 0, limit = 10, agency_id = -1) {
  mutate(
    `${ENDPOINT}/reviews?page=${page}&limit=${limit}&agency_id=${agency_id}`
  )
}
