import GeneralSettings from '@/components/settings/GeneralSettings'

import Admin from '@/layouts/Admin.js'

export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <GeneralSettings />
        </div>
      </div>
    </>
  )
}

Settings.layout = Admin
