import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export default function Index() {
  const router = useRouter()
  const { data: session, status } = useSession()
  if (status !== 'loading') {
    if (session) {
      router.push('/dashboard')
    } else {
      if (window) {
        window.location.href = '/api/auth/signin'
      }
    }
  }
  return <></>
}
