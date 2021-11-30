import { fetcher } from '@/utils'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import { isAdmin } from '@/utils'
const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT

export function useStats() {
  const { data: session } = useSession()
  const user = session && session.user
  const agencyId = isAdmin(user) ? -1 : user.id
  const { data, error } = useSWR(
    `${ENDPOINT}/app/stats?agency_id=${agencyId}`,
    fetcher
  )
  return {
    stats: data && data.data,
    isLoading: !error && !data,
    error,
  }
}
