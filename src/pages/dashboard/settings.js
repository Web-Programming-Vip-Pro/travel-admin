import GeneralSettings from '@/components/settings/GeneralSettings'
import AccountSettings from '@/components/settings/AccountSettings'
import PasswordSettings from '@/components/settings/PasswordSetings'
import Admin from '@/layouts/Admin.js'
import { useState } from 'react'

export default function Settings() {
  const [setting, setSetting] = useState(0)
  return (
    <>
      <h1 className="text-2xl font-bold">Settings</h1>
      <select
        className="select select-bordered select-primary"
        onChange={(e) => setSetting(parseInt(e.target.value))}
      >
        <option value={0}>General</option>
        <option value={1}>Account</option>
        <option value={2}>Password</option>
      </select>
      {setting === 0 && <GeneralSettings />}
      {setting === 1 && <AccountSettings />}
      {setting === 2 && <PasswordSettings />}
    </>
  )
}

Settings.layout = Admin
