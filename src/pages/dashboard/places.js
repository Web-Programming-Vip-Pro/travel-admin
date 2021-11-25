import PlaceForm from '@/components/places/PlaceForm'
import Modal from '@/components/Shared/Modal'
import PaginationButton from '@/components/Shared/Pagination'
import Table from '@/components/Shared/Table'
import Admin from '@/layouts/Admin'
import {
  usePlaces,
  getPlaceType,
  usePlacePages,
  getPlaceStatus,
  deletePlace,
  mutatePlaces,
} from '@/services/places'
import { useEffect, useState } from 'react'
import { useToggle } from 'react-use'

function PlaceModal({ isOpen, toggle, editedPlace }) {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <Modal.Title className="text-2xl font-bold">Add Place</Modal.Title>
      <Modal.Body>
        <PlaceForm editedPlace={editedPlace} />
      </Modal.Body>
    </Modal>
  )
}

const Places = () => {
  const [page, setPage] = useState(0)
  const [type, setType] = useState(-1)
  const [order, setOrder] = useState('recent')
  const [editedPlace, setEditedPlace] = useState(null)
  const [isModalOpen, toggleModal] = useToggle(false)
  const LIMIT = 10
  const { places, isLoading, error } = usePlaces(page, LIMIT, type, order)
  const { totalPages, isLoading: isPagesLoading } = usePlacePages(type, LIMIT)

  async function handleEdit(id) {
    setEditedPlace({ id })
    toggleModal()
  }

  async function handleDelete(id) {
    if (window.confirm('Are you sure?')) {
      const response = await deletePlace(id)
      if (response.success) {
        alert('Place deleted')
        mutatePlaces(page, LIMIT, type, order)
      } else {
        alert(response.message)
      }
    }
  }

  useEffect(() => {
    mutatePlaces(page, LIMIT, type, order)
    if (!isModalOpen) setEditedPlace(null)
  }, [isModalOpen])

  if (isLoading || isPagesLoading) return <div>Loading...</div>
  if (error) return <div>Error!</div>
  return (
    <>
      <h1 className="text-2xl font-bold">Places</h1>
      <div>
        <button className="btn btn-success" onClick={toggleModal}>
          Add
        </button>
      </div>
      <PlaceModal
        isOpen={isModalOpen}
        toggle={toggleModal}
        editedPlace={editedPlace}
      />
      <Table>
        <Table.Head>
          <td>Title</td>
          <td>City</td>
          <td>Type</td>
          <td>Price</td>
          <td>Location</td>
          <td>Stars</td>
          <td>Reviews</td>
          <td>Author</td>
          <td>Created At</td>
        </Table.Head>
        <Table.Body>
          {places.map((place) => (
            <tr key={place.id}>
              <Table.Row>{place.title}</Table.Row>
              <Table.Row>{place.city.name}</Table.Row>
              <Table.Row>{getPlaceType(place.type)}</Table.Row>
              <Table.Row>{place.price}</Table.Row>
              <Table.Row>{place.location}</Table.Row>
              <Table.Row>{place.stars}</Table.Row>
              <Table.Row>{place.reviews}</Table.Row>
              <Table.Row>{place.author.name}</Table.Row>
              <Table.Row>{place.created_at}</Table.Row>
              <Table.Row>
                <Table.EditButton onClick={() => handleEdit(place.id)} />
              </Table.Row>
              <Table.Row>
                <Table.DeleteButton onClick={() => handleDelete(place.id)} />
              </Table.Row>
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

Places.layout = Admin

export default Places
