import Admin from '@/layouts/Admin'
import { isAdmin } from '@/utils'
import { getSession } from 'next-auth/react'

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  const role = session && session.user && parseInt(session.user.role)
  if (isAdmin(role)) {
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
