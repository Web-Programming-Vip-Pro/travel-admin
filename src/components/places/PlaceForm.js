import { useForm, useFieldArray } from 'react-hook-form'
import { useCountries } from '@/services/countries'
import { useCitiesByCountry } from '@/services/city'
import { usePlace, addPlace, editPlace } from '@/services/places'
import { useEffect } from 'react'

const PlaceForm = ({ editedPlace }) => {
  const isEdit = !!editedPlace
  const {
    place,
    isLoading: isPlaceLoading,
    error,
  } = usePlace(editedPlace && editedPlace.id)
  const { countries, isCountriesLoading, isError } = useCountries(0, -1)
  const defaultValues = isEdit
    ? { ...place, country: place && place.country.id }
    : null
  const { register, handleSubmit, watch, control, reset, getValues } = useForm({
    defaultValues,
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'amenities',
  })
  const { cities, isLoading: isCitiesLoading } = useCitiesByCountry(
    watch('country')
  )

  useEffect(() => {
    if (place && countries) {
      reset({
        ...getValues(),
        ...place,
        country: place && place.country.id,
      })
    }
  }, [isPlaceLoading, isCountriesLoading, isCitiesLoading, reset])

  async function onSubmit(data) {
    let response
    if (isEdit) {
      response = await editPlace(data)
    } else {
      response = await addPlace(data)
    }
    if (response.success) {
      alert(isEdit ? 'Place updated' : 'Place added')
    } else {
      alert(response.message)
    }
  }
  if (isCountriesLoading || isPlaceLoading) return <div>Loading...</div>
  if (isError) return <div>Error...</div>
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          placeholder="Title"
          className="input input-primary input-bordered"
          required
          {...register('title', { required: true })}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Country</span>
        </label>
        <select
          className="input input-primary input-bordered"
          {...register('country', { required: true })}
        >
          <option value="">Select country</option>
          {countries &&
            countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">City</span>
        </label>
        <select
          className="input input-primary input-bordered"
          {...register('city_id', { required: true })}
        >
          <option value="">Select city</option>
          {cities &&
            cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Type</span>
        </label>
        <select
          className="input input-primary input-bordered"
          {...register('type')}
        >
          <option value="0">Stay</option>
          <option value="1">Explore</option>
          <option value="2">Food & Drink</option>
        </select>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          className="textarea textarea-primary textarea-bordered"
          placeholder="Description"
          {...register('description', { required: true })}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Price</span>
        </label>
        <input
          type="number"
          placeholder="Price"
          className="input input-primary input-bordered"
          {...register('price', { required: true })}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Location</span>
        </label>
        <input
          type="text"
          placeholder="Location"
          className="input input-primary input-bordered"
          {...register('location', { required: true })}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Status</span>
        </label>
        <select
          className="input input-primary input-bordered"
          {...register('status', { required: true })}
        >
          <option value="0">Pending</option>
          <option value="1">Approved</option>
          <option value="2">Rejected</option>
        </select>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Agency ID</span>
        </label>
        <input
          type="number"
          placeholder="Author ID"
          className="input input-primary input-bordered"
          {...register('author_id', { required: true })}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Images</span>
        </label>
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            placeholder="Image Cover"
            className="input input-primary input-bordered"
            {...register('images.cover', { required: true })}
          />
          <input
            type="text"
            placeholder="Image"
            className="input input-primary input-bordered"
            {...register(`images.lists[0]`, { required: true })}
          />
          <input
            type="text"
            placeholder="Image"
            className="input input-primary input-bordered"
            {...register(`images.lists[1]`, { required: true })}
          />
          <input
            type="text"
            placeholder="Image"
            className="input input-primary input-bordered"
            {...register(`images.lists[2]`, { required: true })}
          />
        </div>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Amenities</span>
        </label>
        <div className="flex flex-col space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-row space-x-2">
              <input
                type="text"
                placeholder="Icon"
                className="input input-primary input-bordered w-1/3"
                required
                {...register(`amenities[${index}].icon`, { required: true })}
              />
              <input
                type="text"
                placeholder="Title"
                className="input input-primary input-bordered w-full"
                required
                {...register(`amenities[${index}].title`, { required: true })}
              />
              <button
                className="btn btn-warning"
                type="button"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <div>
            <button
              className="btn btn-info"
              type="button"
              onClick={() => append({ icon: '', title: '' })}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="form-control mt-4">
        <button className="btn btn-primary" type="submit">
          {isEdit ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  )
}

export default PlaceForm
