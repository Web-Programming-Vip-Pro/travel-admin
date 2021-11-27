import { fetcher } from '@/utils'
import useSWR, { mutate } from 'swr'
const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT

export function useStats() {
  const { data, error } = useSWR(`${ENDPOINT}/app/stats`, fetcher)

  return {
    stats: data && data.data,
    isLoading: !error && !data,
    error,
  }
}
