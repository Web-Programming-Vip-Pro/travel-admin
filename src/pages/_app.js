import Head from 'next/head'

import '@fortawesome/fontawesome-free/css/all.min.css'
import '@/styles/index.css'
import '@fontsource/inter'

export default function MyApp({ Component, pageProps }) {
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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
