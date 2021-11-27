import { fetcher } from '@/utils'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT

export function useStats() {
  const { data: session } = useSession()
  const role = session ? session.user && parseInt(session.user.id) : -1
  const { data, error } = useSWR(
    `${ENDPOINT}/app/stats?agency_id=${role}`,
    fetcher
  )
  return {
    stats: data && data.data,
    isLoading: !error && !data,
    error,
  }
}
