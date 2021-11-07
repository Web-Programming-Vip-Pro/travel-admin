import CardSettings from '@/components/Shared/Cards/CardSettings.js'
import CardProfile from '@/components/Shared/Cards/CardProfile.js'

import Admin from '@/layouts/Admin.js'

export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div>
      </div>
    </>
  )
}

Settings.layout = Admin
