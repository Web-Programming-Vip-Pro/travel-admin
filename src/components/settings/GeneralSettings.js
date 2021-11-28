import { useForm } from 'react-hook-form'

const GeneralSettings = () => {
  const { register, handleSubmit } = useForm()
  async function onSubmit(data) {
    console.log(data)
  }
  return (
    <div>
      <form className="flex flex-col">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            className="input input-primary input-bordered"
            required
            {...register('title', { required: true })}
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
            {...register('description', { required: true })}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Homepage Image Cover</span>
          </label>
          <input
            type="text"
            placeholder="Image URL"
            className="input input-primary input-bordered"
            required
            {...register('home_image_cover', { required: true })}
          />
        </div>
      </form>
    </div>
  )
}

export default GeneralSettings
