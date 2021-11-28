import { useForm } from 'react-hook-form'
import { updatePassword } from '@/services/user'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

const PasswordSetings = () => {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const user = session?.user
  const { register, handleSubmit } = useForm()

  async function onSubmit(data) {
    setIsLoading(true)
    const response = await updatePassword({ id: user.id, ...data })
    if (response.success) {
      alert('Password updated')
    } else {
      alert('Failed to update password')
    }
    setIsLoading(false)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">New Password</span>
        </label>
        <input
          type="password"
          placeholder="New Password"
          className="input input-primary input-bordered"
          required
          {...register('newPassword', { required: true })}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Confirm New Password</span>
        </label>
        <input
          type="password"
          placeholder="Confirm New Password"
          className="input input-primary input-bordered"
          required
          {...register('confirmNewPassword', { required: true })}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Old Password</span>
        </label>
        <input
          type="password"
          placeholder="Old Password"
          className="input input-primary input-bordered"
          required
          {...register('oldPassword', { required: true })}
        />
      </div>
      <div className="mt-4 form-control">
        <div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default PasswordSetings
