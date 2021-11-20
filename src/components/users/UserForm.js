import { addUser, updateUser } from '@/services/user'
import { useForm } from 'react-hook-form'

const UserForm = ({ editUser }) => {
  const { register, handleSubmit } = useForm({ defaultValues: editUser })
  const isEdited = editUser !== null
  async function onSubmit(data) {
    const user = { repassword: data.password, ...data }
    const response = isEdited ? await updateUser(user) : await addUser(user)
    if (response.success) {
      alert(isEdited ? 'User updated' : 'User added')
    } else {
      alert('Error: ' + response.message)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          placeholder="Name"
          className="input input-primary input-bordered"
          required
          {...register('name', { required: true })}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="Name"
          className="input input-primary input-bordered"
          required
          {...register('email', { required: true })}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="Password"
          className="input input-primary input-bordered"
          required
          {...register('password', { required: true })}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Avatar</span>
        </label>
        <input
          type="text"
          placeholder="Avatar URL"
          className="input input-primary input-bordered"
          {...register('avatar')}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Image Cover</span>
        </label>
        <input
          type="text"
          placeholder="Image Cover"
          className="input input-primary input-bordered"
          {...register('image_cover')}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Blocked</span>
        </label>
        <select
          className="input input-primary input-bordered"
          {...register('blocked')}
        >
          <option value={0}>No</option>
          <option value={1}>Yes</option>
        </select>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Bio</span>
        </label>
        <textarea
          placeholder="Bio"
          className="textarea textarea-primary textarea-bordered"
          {...register('bio')}
        />
      </div>
      <div className="flex space-x-2">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Facebook</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            className="input input-primary input-bordered"
            {...register('facebook')}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Instagram</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            className="input input-primary input-bordered"
            {...register('instagram')}
          />
        </div>
      </div>
      <div className="form-control mt-4">
        <button className="btn btn-primary" type="submit">
          {isEdited ? 'Update' : 'Add'}
        </button>
      </div>
    </form>
  )
}

export default UserForm
