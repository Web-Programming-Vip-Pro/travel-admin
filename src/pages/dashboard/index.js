import Admin from '@/layouts/Admin'
import { useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  const role = session && session.user && parseInt(session.user.role)
  if (role === 0) {
    return {
      redirect: {
        destination: '/dashboard/users',
      },
    }
  }
  return {
    redirect: {
      destination: '/dashboard/places',
    },
  }
}

export default function Dashboard() {
  return <></>
}

Dashboard.layout = Admin
