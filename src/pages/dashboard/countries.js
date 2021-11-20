import Modal from '@/components/Shared/Modal'
import Admin from '@/layouts/Admin'
import {
  addCountry,
  deleteCountry,
  mutateCountries,
  updateCountry,
  useCountries,
  useTotalCountries,
} from '@/services/countries'
import { useEffect, useState } from 'react'
import { useToggle } from 'react-use'
import PaginationButton from '@/components/Shared/Pagination'

function CountryModal({ isOpen, toggle, isAddNewCountry, selectedCountry }) {
  const [name, setName] = useState(isAddNewCountry ? '' : selectedCountry.name)
  function addOrUpdateCountry() {
    if (isAddNewCountry) {
      addCountry(name)
    } else {
      updateCountry(selectedCountry.id, name)
    }
    toggle(false)
  }
  useEffect(() => {
    setName(isAddNewCountry ? '' : selectedCountry.name)
  }, [isOpen])
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <Modal.Body>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Country Name</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Action>
        <button className="btn btn-primary" onClick={addOrUpdateCountry}>
          {isAddNewCountry ? 'Add Country' : 'Update Country'}
        </button>
      </Modal.Action>
    </Modal>
  )
}

const Countries = () => {
  const [page, setPage] = useState(0)
  const limit = 10
  const { countries, isLoading, isError } = useCountries(page, limit)
  const { total } = useTotalCountries(limit)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [isAddNewCountry, toggleAddNewCountry] = useToggle(true)

  function selectCountry(id, name) {
    setSelectedCountry({ id, name })
    toggle()
    toggleAddNewCountry(false)
  }
  async function confirmAndRemove(id) {
    if (window.confirm('Are you sure?')) {
      await deleteCountry(id)
      alert('Country deleted')
      mutateCountries(page, limit)
    }
  }
  const [isOpen, toggle] = useToggle(false)
  useEffect(() => {
    if (!isOpen) {
      setSelectedCountry(null)
      toggleAddNewCountry(true)
      mutateCountries(page, limit)
    }
  }, [isOpen])

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  return (
    <div className="flex flex-col space-y-4 relative bg-blueGray-100 text-blueGray-900 p-4 rounded-lg w-full">
      <div>
        <button className="btn btn-primary" onClick={() => toggle(true)}>
          Add
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country, index) => (
              <tr key={index}>
                <th>{index}</th>
                <td>{country.name}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => selectCountry(country.id, country.name)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => confirmAndRemove(country.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <PaginationButton
          currentPage={page}
          totalPages={total}
          onPageChange={(page) => setPage(page)}
        />
      </div>
      <CountryModal
        isOpen={isOpen}
        toggle={toggle}
        isAddNewCountry={isAddNewCountry}
        selectedCountry={selectedCountry}
      />
    </div>
  )
}

Countries.layout = Admin

export default Countries
