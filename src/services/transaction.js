import useSWR, { mutate } from 'swr'
import { fetcher } from '@/utils'
import axios from 'axios'

const ENDPOINT = `${process.env.NEXT_PUBLIC_ENDPOINT}`

export function useTransactions(page = 0, limit = 10, agency_id = -1) {
  const { data, error } = useSWR(
    `${ENDPOINT}/transactions?page=${page}&limit=${limit}&agency_id=${agency_id}`,
    fetcher
  )
  return {
    transactions: data && data.data.data,
    totalPages: data && data.data.total_pages,
    isLoading: !error && !data,
    error,
  }
}

export async function updateTransaction(id, status_place, message) {
  try {
    const response = await axios.post(`${ENDPOINT}/transaction/edit`, {
      id,
      status_place,
      message,
    })
    return { success: true, message: response.data }
  } catch (err) {
    return { success: false, message: err.response.data }
  }
}

export function mutateTransactions(page = 0, limit = 10, agency_id = -1) {
  mutate(
    `${ENDPOINT}/transactions?page=${page}&limit=${limit}&agency_id=${agency_id}`,
    null
  )
}

export function getTransactionStatus(status) {
  // 0 - waiting for confirmation, 1 - booking, 2 - cancelled, 3 - finished
  status = parseInt(status)
  switch (status) {
    case 0:
      return 'Waiting for confirmation'
    case 1:
      return 'Booking'
    case 2:
      return 'Cancelled'
    case 3:
      return 'Finished'
    default:
      return 'Unknown'
  }
}
