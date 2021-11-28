import { isAdmin } from '@/utils'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { updateInfo } from '@/services/user'

const AccountSetting = () => {
  const { data: session } = useSession()
  const user = session?.user
  const isAgency = !isAdmin(user)
  const { register, handleSubmit } = useForm({
    defaultValues: {
      ...user,
      password: '',
    },
  })
  async function onSubmit(data) {
    // remove social property from data
    delete data.social
    const response = await updateInfo(data)
    if (response.success) {
      alert('Update success!')
    } else {
      alert(response.message)
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
      {isAgency && (
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
      )}

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
      {isAgency && (
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
      )}
      <hr className="h-0 border-[1px] mt-2 border-black" />
      <div className="form-control">
        <label className="label">
          <span className="label-text">Confirm Password</span>
        </label>
        <input
          type="password"
          placeholder="Confirm Password"
          required
          className="input input-primary input-bordered"
          {...register('password', { required: true })}
        />
      </div>
      <div className="mt-4 form-control">
        <button className="btn btn-primary" type="submit">
          Update
        </button>
      </div>
    </form>
  )
}

export default AccountSetting
