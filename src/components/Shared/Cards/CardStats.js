import React from 'react'
import PropTypes from 'prop-types'

export default function CardStats({
  statSubtitle,
  statTitle,

  statIconName,
  statIconColor,
}) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white rounded shadow-lg xl:mb-0">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative flex-1 flex-grow w-full max-w-full pr-4">
              <h5 className="text-xs font-bold uppercase text-blueGray-400">
                {statSubtitle}
              </h5>
              <span className="text-xl font-semibold text-blueGray-700">
                {statTitle}
              </span>
            </div>
            <div className="relative flex-initial w-auto pl-4">
              <div
                className={
                  'text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ' +
                  statIconColor
                }
              >
                <i className={statIconName}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

CardStats.defaultProps = {
  statSubtitle: 'Traffic',
  statTitle: '350,897',
  statIconName: 'far fa-chart-bar',
  statIconColor: 'bg-red-500',
}

CardStats.propTypes = {
  statSubtitle: PropTypes.string,
  statTitle: PropTypes.string,
  statIconName: PropTypes.string,
  statIconColor: PropTypes.string,
}
