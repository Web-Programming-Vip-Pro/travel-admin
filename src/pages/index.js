import Auth from '@/layouts/Auth.js'

export async function getStaticProps() {
  return {
    redirect: {
      destination: '/login',
    },
  }
}

const Index = () => {
  return <></>
}

export default Index

Index.layout = Auth
