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
import { useForm } from 'react-hook-form'
import Table from '@/components/Shared/Table'

function CountryModal({ isOpen, toggle, selectedCountry }) {
  const isEdit = selectedCountry !== null
  const { register, handleSubmit } = useForm({
    defaultValues: selectedCountry,
  })
  async function onSubmit(data) {
    const { name, image } = data
    let response
    if (!isEdit) {
      response = await addCountry(name, image)
    } else {
      response = await updateCountry(selectedCountry.id, name, image)
    }
    if (response.success) {
      alert(isEdit ? 'Country updated' : 'Country added')
      toggle()
    } else {
      alert(response.message)
    }
  }
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <Modal.Body>
        <form
          className="flex flex-col space-y-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Country Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="input input-primary input-bordered"
              {...register('name', { required: true })}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              type="text"
              placeholder="Image URL"
              className="input input-primary input-bordered"
              {...register('image', { required: true })}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            {!isEdit ? 'Add Country' : 'Update Country'}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  )
}

const Countries = () => {
  const [page, setPage] = useState(0)
  const limit = 10
  const { countries, isLoading, isError } = useCountries(page, limit)
  const { total } = useTotalCountries(limit)
  const [selectedCountry, setSelectedCountry] = useState(null)

  function selectCountry(country) {
    setSelectedCountry(country)
    toggle()
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
      mutateCountries(page, limit)
    }
  }, [isOpen])

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  return (
    <>
      <div>
        <button className="btn btn-primary" onClick={() => toggle(true)}>
          Add
        </button>
        {isOpen && (
          <CountryModal
            isOpen={isOpen}
            toggle={toggle}
            selectedCountry={selectedCountry}
          />
        )}
      </div>
      <Table>
        <Table.Head>
          <th></th>
          <th>Name</th>
          <th>Image</th>
        </Table.Head>
        <Table.Body>
          {countries.map((country, index) => (
            <tr key={index}>
              <Table.Row>{index}</Table.Row>
              <Table.Row>{country.name}</Table.Row>
              <Table.Row>
                <img src={country.image} alt={country.name} className="w-12" />
              </Table.Row>
              <Table.Row>
                <Table.EditButton onClick={() => selectCountry(country)} />
              </Table.Row>
              <Table.Row>
                <Table.DeleteButton
                  onClick={() => confirmAndRemove(country.id)}
                />
              </Table.Row>
            </tr>
          ))}
        </Table.Body>
      </Table>

      <div>
        <PaginationButton
          currentPage={page}
          totalPages={total}
          onPageChange={(page) => setPage(page)}
        />
      </div>
    </>
  )
}

Countries.layout = Admin

export default Countries
