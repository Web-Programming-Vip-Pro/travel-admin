import axios from 'axios'
const ENDPOINT = `${process.env.NEXT_PUBLIC_ENDPOINT}`

export const getPages = async () => {
  const pages = await axios.get(`${ENDPOINT}/pages`).then((res) => res.data)
  return pages.data
}

export const updatePage = async (pageId, content) => {
  try {
    await axios
      .post(`${ENDPOINT}/page/update`, { id: pageId, content })
      .then((res) => res.data)
    return { success: true, message: null }
  } catch (err) {
    return { success: false, message: err.message }
  }
}
