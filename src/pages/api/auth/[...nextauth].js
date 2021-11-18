import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credential',
      credentials: {
        email: { type: 'email', label: 'Email', placeholder: 'Email' },
        password: {
          type: 'password',
          label: 'Password',
          placeholder: 'Password',
        },
      },
      authorize: async (credentials) => {
        const url = process.env.NEXT_PUBLIC_ENDPOINT
        try {
          const response = await axios
            .post(`${url}/login`, credentials)
            .then((res) => res.data)
          const user = response.data
          if (user.role === '2') {
            return user
          }
          return null
        } catch (err) {
          return null
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user
      }
      return token
    },
    session: ({ token, session }) => {
      if (token) {
        session.user = token.user
      }
      return session
    },
  },
  jwt: {
    secret: 'secret',
  },
  secret: 'secret',
})
