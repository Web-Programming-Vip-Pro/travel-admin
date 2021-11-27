import Admin from '@/layouts/Admin'
import {
  mutateCities,
  mutateTotalCities,
  useCities,
  useTotalCities,
} from '@/services/city'
import { formatDate, shorten } from '@/utils'
import { useEffect, useState } from 'react'
import { useToggle } from 'react-use'
import CityForm from '@/components/city/CityForm'
import Modal from '@/components/Shared/Modal'
import { deleteCity } from '@/services/city'
import PaginationButton from '@/components/Shared/Pagination'
import Table from '@/components/Shared/Table'
import TableHeader from '@/components/Shared/Table/TableHeader'
import { getSession } from 'next-auth/react'

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  const role = session && session.user && parseInt(session.user.role)
  if (role === 1) {
    return {
      redirect: {
        destination: '/dashboard/places',
      },
    }
  }
  return {
    props: {},
  }
}

function CityModal({ isOpen, toggleModal, isEdit, editedCity }) {
  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <Modal.Body>
        <h1 className="text-2xl font-bold">
          {isEdit ? 'Edit City' : 'Add City'}
        </h1>
        <CityForm defaultCity={editedCity} />
      </Modal.Body>
      <Modal.Action></Modal.Action>
    </Modal>
  )
}

function Paginate({ currentPage, limit, onPageChange }) {
  const { total, isLoading, error } = useTotalCities(limit)
  if (error) return <div>failed to load data</div>
  if (isLoading) return <div>loading...</div>
  return (
    <PaginationButton
      totalPages={total}
      onPageChange={onPageChange}
      currentPage={currentPage}
    />
  )
}

const Cities = () => {
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(0)
  const [searchText, setSearchText] = useState('')
  const { cities, isLoading, error } = useCities(page, limit, searchText)
  const [isModalOpen, toggleModal] = useToggle(false)
  const [city, setCity] = useState(null)
  const [isEdit, setEdit] = useState(false)

  function handleAdd() {
    setCity(null)
    setEdit(false)
    toggleModal()
  }
  function handleEdit(city) {
    setCity(city)
    setEdit(true)
    toggleModal()
  }

  async function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this city?')) {
      const response = await deleteCity(id)
      if (response.success) {
        alert('City deleted successfully')
        mutateCities(page, limit)
      } else {
        alert(response.message)
      }
    }
  }

  useEffect(() => {
    if (!isModalOpen) {
      mutateCities(page, limit, searchText)
      mutateTotalCities(limit)
      setCity(null)
    }
  }, [isModalOpen])

  if (error) return <div>failed to load data</div>
  return (
    <>
      <div>
        <TableHeader
          toggleModal={handleAdd}
          setLimit={setLimit}
          setSearchText={setSearchText}
        />
        {isModalOpen && (
          <CityModal
            isOpen={isModalOpen}
            toggleModal={toggleModal}
            isEdit={isEdit}
            editedCity={city}
          />
        )}
      </div>
      {isLoading && <div>loading...</div>}
      {!isLoading && cities && (
        <>
          <Table>
            <Table.Head>
              <th></th>
              <th>Name</th>
              <th>Country</th>
              <th>Total Place</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Updated At</th>
            </Table.Head>
            <Table.Body>
              {cities.map((city) => (
                <tr key={city.id}>
                  <Table.Row>
                    <img
                      src={city.image_cover}
                      alt={city.name}
                      className="w-12 h-12 rounded-full"
                    />
                  </Table.Row>
                  <Table.Row>{city.name}</Table.Row>
                  <Table.Row>{city.country.name}</Table.Row>
                  <Table.Row>{city.total_places}</Table.Row>
                  <Table.Row>{city.description}</Table.Row>
                  <Table.Row>{formatDate(city.created_at)}</Table.Row>
                  <Table.Row>{formatDate(city.updated_at)}</Table.Row>
                  <Table.Row>
                    <Table.EditButton onClick={() => handleEdit(city)} />
                  </Table.Row>
                  <Table.Row>
                    <Table.DeleteButton onClick={() => handleDelete(city.id)} />
                  </Table.Row>
                </tr>
              ))}
            </Table.Body>
          </Table>
          <div>
            <Paginate
              currentPage={page}
              limit={limit}
              onPageChange={(page) => setPage(page)}
            />
          </div>
        </>
      )}
    </>
  )
}

Cities.layout = Admin

export default Cities
