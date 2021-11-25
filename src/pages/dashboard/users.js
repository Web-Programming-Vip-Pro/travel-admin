import Input from '@/components/Shared/Input'
import Modal from '@/components/Shared/Modal'
import PaginationButton from '@/components/Shared/Pagination'
import Table from '@/components/Shared/Table'
import UserForm from '@/components/users/UserForm'
import Admin from '@/layouts/Admin'
import {
  deleteUser,
  mutateUsers,
  useUsers,
  useUsersPage,
} from '@/services/user'
import { useEffect, useState } from 'react'
import { useToggle } from 'react-use'

function UserModal({ isOpen, toggle, editUser }) {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <Modal.Body>
        <UserForm editUser={editUser} />
      </Modal.Body>
    </Modal>
  )
}

const Users = () => {
  const [page, setPage] = useState(0)
  const [isModalOpen, toggleModal] = useToggle(false)
  const [editUser, setEditUser] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [limit, setLimit] = useState(10)
  const ROLE = 0
  const { totalPages, isLoading: isTotalPagesLoading } = useUsersPage(limit)
  const { users, loading, error } = useUsers(page, limit, ROLE, searchText)
  useEffect(() => {
    if (!isModalOpen) {
      setEditUser(null)
    }
    mutateUsers(page, limit)
  }, [isModalOpen])

  async function handleDelete(id) {
    if (window.confirm('Are you sure?')) {
      const response = await deleteUser(id)
      if (response.success) {
        mutateUsers(page, limit)
        alert('User deleted!')
      } else {
        alert(response.message)
      }
    }
  }

  async function handleEdit(user) {
    toggleModal()
    setEditUser(user)
  }
  if (loading || isTotalPagesLoading) return <div>Loading...</div>
  if (error) return <div>Error!</div>
  return (
    <>
      <h1 className="text-2xl font-bold">Users</h1>
      <div className="flex justify-between">
        <button className="btn btn-success" onClick={toggleModal}>
          Add
        </button>
        <div className="flex space-x-2">
          <div className="flex items-center space-x-2">
            <p>Show</p>
            <select
              className="select"
              onChange={(e) => setLimit(e.target.value)}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <p>values</p>
          </div>
          <Input
            className="input input-primary input-bordered"
            type="text"
            placeholder="Search"
            debounce={500}
            onValueChange={setSearchText}
          />
        </div>
      </div>
      <UserModal
        isOpen={isModalOpen}
        toggle={toggleModal}
        editUser={editUser}
      />
      <Table>
        <Table.Head>
          <td>Name</td>
          <td>Email</td>
          <td>Avatar</td>
          <td>Blocked</td>
        </Table.Head>
        <Table.Body>
          {users &&
            users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <img src={user.avatar} alt={user.name} className="w-20" />
                </td>
                <td>
                  <div
                    className={`badge ${
                      parseInt(user.blocked) ? 'badge-error' : 'badge-success'
                    }`}
                  >
                    {parseInt(user.blocked) ? 'Yes' : 'No'}
                  </div>
                </td>
                <td>
                  <Table.EditButton onClick={() => handleEdit(user)} />
                </td>
                <td>
                  <Table.DeleteButton onClick={() => handleDelete(user.id)} />
                </td>
              </tr>
            ))}
        </Table.Body>
      </Table>
      <div>
        <PaginationButton
          currentPage={page}
          onPageChange={setPage}
          totalPages={totalPages}
        />
      </div>
    </>
  )
}

Users.layout = Admin

export default Users
