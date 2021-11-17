import Head from 'next/head'

import '@fortawesome/fontawesome-free/css/all.min.css'
import '@/styles/index.css'
import '@fontsource/inter'
import { useVerifyUser } from '@/services/auth'
import { useUserStore } from '@/store/user'
import Loading from '@/components/Shared/Loading'

export default function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>)
  const { user, isLoading, isError } = useVerifyUser()
  if (!isLoading) {
    useUserStore.getState().setIsLoading(false)
    if (isError) {
      useUserStore.getState().setUser(null)
    } else {
      useUserStore.getState().setUser(user)
    }
  }
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Fleety Admin</title>
      </Head>
      {isLoading ? (
        <Loading />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  )
}
