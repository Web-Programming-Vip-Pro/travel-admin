const SortOrder = [
  { label: 'Recent', value: 'desc' },
  { label: 'Oldest', value: 'asc' },
]
const PlaceOrder = [
  { label: 'Recent', value: 'recent' },
  { label: 'Mpst Rating', value: 'rating' },
  { label: 'High Price', value: 'max-price' },
  { label: 'Low Price', value: 'low-price' },
]
const ReviewOrder = [
  { label: 'Recent', value: 'recent' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Most Rated', value: 'most-rated' },
  { label: 'Least Rated', value: 'least-rated' },
]

const SelectOrder = ({ order, orderData, setOrder }) => {
  return (
    <div className="flex items-center space-x-2">
      <p>Sort by</p>
      <select
        className="select"
        onChange={(e) => setOrder(e.target.value)}
        value={order}
      >
        {orderData.map((order) => (
          <option value={order.value}>{order.label}</option>
        ))}
      </select>
    </div>
  )
}

SelectOrder.SortOrder = SortOrder
SelectOrder.PlaceOrder = PlaceOrder
SelectOrder.ReviewOrder = ReviewOrder

export default SelectOrder
