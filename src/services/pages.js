import axios from 'axios'
const ENDPOINT = `${process.env.NEXT_PUBLIC_ENDPOINT}`

export const getPages = async () => {
  const pages = await axios.get(`${ENDPOINT}/pages`).then((res) => res.data)
  return pages.data
}
