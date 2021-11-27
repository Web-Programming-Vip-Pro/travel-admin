import Admin from '@/layouts/Admin'
import router, { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Dashboard() {
  useEffect(() => {
    router.push('/dashboard/users')
  }, [])
  return <></>
}

Dashboard.layout = Admin
