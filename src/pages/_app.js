import Head from 'next/head'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@/styles/index.css'
import '@fontsource/inter'
import { SessionProvider } from 'next-auth/react'

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const Layout = Component.layout || (({ children }) => <>{children}</>)
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Fleety Admin</title>
      </Head>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  )
}
