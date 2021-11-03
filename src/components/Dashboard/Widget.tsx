interface WidgetProps {
  title: string
  amount: string
  icon: string
  info: string
}

const Widget = ({ title, amount, info, icon }: WidgetProps) => {
  return (
    <div className="card widget widget-stats">
      <div className="card-body">
        <div className="widget-stats-container d-flex">
          <div className="widget-stats-icon widget-stats-icon-primary">
            <i className="material-icons-outlined">{icon}</i>
          </div>
          <div className="widget-stats-content flex-fill">
            <span className="widget-stats-title">{title}</span>
            <span className="widget-stats-amount">{amount}</span>
            <span className="widget-stats-info">{info}</span>
          </div>
          {/* <div className="widget-stats-indicator widget-stats-indicator-negative align-self-start">
            <i className="material-icons">keyboard_arrow_down</i> 4%
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Widget
