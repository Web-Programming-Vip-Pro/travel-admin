import { fetcher } from '@/utils'
import axios from 'axios'
import useSWR, { mutate } from 'swr'
const ENDPOINT = `${process.env.NEXT_PUBLIC_ENDPOINT}`

export function useUsers(page = 0, limit = 20, role = 0) {
  const { data, error } = useSWR(
    `${ENDPOINT}/users?page=${page}&limit=${limit}&role=${role}`,
    fetcher
  )
  return {
    users: data && data.data,
    isLoading: !error && !data,
    error,
  }
}

export function useUsersPage(limit = 20) {
  const role = 0
  const { data, error } = useSWR(
    `${ENDPOINT}/user/pages?limit=${limit}&role=${role}`,
    fetcher
  )
  return {
    totalPages: data && data.data,
    isLoading: !error && !data,
    error,
  }
}

export async function addUser(data) {
  try {
    const response = await axios.post(`${ENDPOINT}/user/add`, data)
    return { success: true, message: response.data }
  } catch (error) {
    return { success: false, message: error.response.data.data }
  }
}

export async function updateUser(user) {
  try {
    const response = await axios.post(`${ENDPOINT}/user/update`, user)
    return { success: true, message: response.data }
  } catch (error) {
    return { success: false, message: error.response.data }
  }
}

export async function deleteUser(id) {
  try {
    const response = await axios
      .post(`${ENDPOINT}/user/delete`, { id })
      .then((res) => res.data)
    return { success: true, message: response.data }
  } catch (error) {
    return { success: false, message: error.response.data }
  }
}

export function mutateUsers(page = 0, limit = 20, role = 0) {
  mutate(`${ENDPOINT}/users?page=${page}&limit=${limit}&role=${role}`)
}
