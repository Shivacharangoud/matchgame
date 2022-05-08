import './TabItem.css'

const TabItem = props => {
  const {detail, tabTriggered, category} = props
  const {displayText, tabId} = detail
  const isActive = category === tabId
  const addClassName = isActive ? 'border-bottom' : ''
  const tabButtonClicked = () => {
    tabTriggered(tabId)
  }
  return (
    <li className="tab-list-item">
      <button
        onClick={tabButtonClicked}
        type="button"
        className={`tab-para ${addClassName}`}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
