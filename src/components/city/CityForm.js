import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCountries } from '@/services/countries'
import { addCity, updateCity } from '@/services/city'

function CityForm({ defaultCity }) {
  const { countries } = useCountries()
  const [error, setError] = useState(null)
  const isEdit = !!defaultCity
  const { register, handleSubmit } = useForm()
  async function onSubmit(data) {
    setError(null)
    let response
    if (isEdit) {
      response = await updateCity(defaultCity.id, data)
    } else {
      response = await addCity(data)
    }
    if (response.success) {
      setError(false)
    } else {
      setError(response.message)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error !== null && (
        <div
          className={`alert py-2 ${error ? `alert-error` : 'alert-success'}`}
        >
          {error ? error : 'City added successfully'}
        </div>
      )}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          placeholder="Name"
          className="input input-primary input-bordered"
          defaultValue={defaultCity?.name}
          required
          {...register('name', { required: true })}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <input
          type="text"
          placeholder="Description"
          className="input input-primary input-bordered"
          required
          defaultValue={defaultCity?.description}
          {...register('description', { required: true })}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Image Cover</span>
        </label>
        <input
          type="text"
          placeholder="Image URL"
          className="input input-primary input-bordered"
          required
          defaultValue={defaultCity?.image_cover}
          {...register('image_cover', { required: true })}
        />
      </div>
      {countries && (
        <div className="form-control">
          <label className="label">
            <span className="label-text">Country</span>
          </label>
          <select
            className="input input-primary input-bordered"
            required
            defaultValue={defaultCity?.country_id}
            {...register('country_id', { required: true })}
          >
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <hr />
      <div className="form-control mt-4">
        <button className="btn btn-info">{isEdit ? 'Update' : 'Create'}</button>
      </div>
    </form>
  )
}

export default CityForm
