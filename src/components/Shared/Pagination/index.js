const PaginationButton = ({ totalPages, currentPage, onPageChange }) => {
  function handlePageChange(page) {
    if (page > totalPages - 1) return
    if (page < 0) return
    onPageChange(page)
  }
  return (
    <div className="btn-group">
      <button className="btn" onClick={() => handlePageChange(currentPage - 1)}>
        Prev
      </button>
      {Array(totalPages)
        .fill(null)
        .map((_, i) => (
          <button
            className={`btn ${currentPage === i && 'btn-active'}`}
            key={i}
            onClick={() => onPageChange(i)}
            disabled={i === currentPage}
          >
            {i + 1}
          </button>
        ))}
      <button className="btn" onClick={() => handlePageChange(currentPage + 1)}>
        Next
      </button>
    </div>
  )
}

export default PaginationButton
