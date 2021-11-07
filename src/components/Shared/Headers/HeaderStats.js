import { useState } from 'react'

import CardStats from '@/components/Shared/Cards/CardStats.js'

export default function HeaderStats() {
  return (
    <>
      <div className="relative pt-12 pb-32 bg-blueGray-800 md:pt-32">
        <div className="w-full px-4 mx-auto md:px-10">
          <div>
            <div className="grid grid-cols-4 gap-3">
              <CardStats
                statSubtitle="REVENUES"
                statTitle="924$"
                statArrow="down"
                statPercent="1.10"
                statPercentColor="text-orange-500"
                statDescripiron="Since last month"
                statIconName="fas fa-money-bill"
                statIconColor="bg-pink-500"
              />

              <CardStats
                statSubtitle="REVERSES"
                statTitle="13"
                statArrow="up"
                statPercent="12"
                statPercentColor="text-emerald-500"
                statDescripiron="Since last month"
                statIconName="fas fa-percent"
                statIconColor="bg-lightBlue-500"
              />
              <CardStats
                statSubtitle="NEW AGENCIES"
                statTitle="12"
                statArrow="up"
                statPercent="3.48"
                statPercentColor="text-emerald-500"
                statDescripiron="Since last month"
                statIconName="fas fa-user-tie"
                statIconColor="bg-red-500"
              />
              <CardStats
                statSubtitle="NEW USERS"
                statTitle="2,356"
                statArrow="down"
                statPercent="3.48"
                statPercentColor="text-red-500"
                statDescripiron="Since last month"
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
