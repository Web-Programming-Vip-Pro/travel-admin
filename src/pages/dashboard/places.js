import PlaceForm from '@/components/places/PlaceForm'
import Modal from '@/components/Shared/Modal'
import PaginationButton from '@/components/Shared/Pagination'
import Table from '@/components/Shared/Table'
import TableHeader from '@/components/Shared/Table/TableHeader'
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

function SelectTypeAndOrder({ setType, setOrder, type, order }) {
  return (
    <div className="flex flex-row justify-between space-x-4">
      {/* Select type with value - label: (-1, All), (0, Stay), (1, Explore), (2, Food & Drink) */}
      <div className="w-full form-control">
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Type
        </label>
        <select
          className="select select-bordered select-primary"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value={-1}>All</option>
          <option value={0}>Stay</option>
          <option value={1}>Explore</option>
          <option value={2}>Food & Drink</option>
        </select>
      </div>
      {/* Select order with value - label: (recent, Recent), (rating, Rating), (max-price, High Price), (min-price, Low Price) */}
      <div className="w-full form-control">
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Order
        </label>
        <select
          className="select select-bordered select-primary"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value={'recent'}>Recent</option>
          <option value={'rating'}>Rating</option>
          <option value={'max-price'}>High Price</option>
          <option value={'min-price'}>Low Price</option>
        </select>
      </div>
    </div>
  )
}

const Places = () => {
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const [type, setType] = useState(-1)
  const [order, setOrder] = useState('recent')
  const [searchText, setSearchText] = useState('')
  const [editedPlace, setEditedPlace] = useState(null)
  const [isModalOpen, toggleModal] = useToggle(false)
  const { places, isLoading, error } = usePlaces(
    page,
    limit,
    type,
    order,
    searchText
  )
  const { totalPages, isLoading: isPagesLoading } = usePlacePages(
    type,
    limit,
    searchText
  )

  async function handleEdit(id) {
    setEditedPlace({ id })
    toggleModal()
  }

  async function handleDelete(id) {
    if (window.confirm('Are you sure?')) {
      const response = await deletePlace(id)
      if (response.success) {
        alert('Place deleted')
        mutatePlaces(page, limit, type, order, searchText)
      } else {
        alert(response.message)
      }
    }
  }

  useEffect(() => {
    mutatePlaces(page, limit, type, order, searchText)
    if (!isModalOpen) setEditedPlace(null)
  }, [isModalOpen])

  if (error) return <div>Error!</div>
  return (
    <>
      <h1 className="text-2xl font-bold">Places</h1>
      <TableHeader
        toggleModal={toggleModal}
        setLimit={setLimit}
        setSearchText={setSearchText}
      />
      <SelectTypeAndOrder
        type={type}
        order={order}
        setType={setType}
        setOrder={setOrder}
      />
      <PlaceModal
        isOpen={isModalOpen}
        toggle={toggleModal}
        editedPlace={editedPlace}
      />
      {(isLoading || isPagesLoading) && <div>Loading...</div>}
      {places && (
        <>
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
                    <Table.DeleteButton
                      onClick={() => handleDelete(place.id)}
                    />
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
      )}
    </>
  )
}

Places.layout = Admin

export default Places
