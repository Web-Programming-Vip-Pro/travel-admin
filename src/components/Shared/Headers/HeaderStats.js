import CardStats from '@/components/Shared/Cards/CardStats.js'
import { useStats } from '@/services/stats'
import { isAdmin } from '@/utils'
import { useSession } from 'next-auth/react'

export default function HeaderStats() {
  const { data } = useSession()
  const user = data && data.user
  const { stats } = useStats()
  return (
    <>
      <div className="relative pt-12 pb-32 bg-blueGray-800 md:pt-32">
        <div className="w-full px-4 mx-auto md:px-10">
          <div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
              <CardStats
                statSubtitle="REVENUE"
                statTitle={`${stats && stats.totalRevenue}$`}
                statPercentColor="text-orange-500"
                statIconName="fas fa-money-bill"
                statIconColor="bg-pink-500"
              />
              <CardStats
                statSubtitle="REVERSES"
                statTitle={`${stats && stats.totalTransactions}`}
                statPercentColor="text-emerald-500"
                statIconColor="bg-lightBlue-500"
              />
              {isAdmin(user) && (
                <CardStats
                  statSubtitle="TOTAL AGENCIES"
                  statTitle={`${stats && stats.totalAgencies}`}
                  statPercentColor="text-emerald-500"
                  statIconName="fas fa-user-tie"
                  statIconColor="bg-red-500"
                />
              )}
              <CardStats
                statSubtitle="TOTAL USERS"
                statTitle={`${stats && stats.totalUsers}`}
                statPercentColor="text-red-500"
                statIconName="fas fa-users"
                statIconColor="bg-orange-500"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
