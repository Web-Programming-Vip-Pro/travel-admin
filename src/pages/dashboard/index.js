import CardLineChart from '@/components/Shared/Cards/CardLineChart.js'
import CardBarChart from '@/components/Shared/Cards/CardBarChart.js'
import CardPageVisits from '@/components/Shared/Cards/CardPageVisits.js'
import CardSocialTraffic from '@/components/Shared/Cards/CardSocialTraffic.js'

import Admin from '@/layouts/Admin.js'

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4 mb-12 xl:w-8/12 xl:mb-0">
          <CardLineChart />
        </div>
        <div className="w-full px-4 xl:w-4/12">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full px-4 mb-12 xl:w-8/12 xl:mb-0">
          {/* <CardPageVisits /> */}
        </div>
        <div className="w-full px-4 xl:w-4/12">
          {/* <CardSocialTraffic /> */}
        </div>
      </div>
    </>
  )
}

Dashboard.layout = Admin
