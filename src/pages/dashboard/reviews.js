import Admin from '@/layouts/Admin'
import { useState } from 'react'
import { isAdmin } from '@/utils'
import { useSession } from 'next-auth/react'
import { useReviews } from '@/services/review'
import Table from '@/components/Shared/Table'
import PaginationButton from '@/components/Shared/Pagination'
import SelectLimit from '@/components/Shared/Table/SelectLimit'
import SelectOrder from '@/components/Shared/Table/SelectOrder'

const Reviews = () => {
  const { data: session } = useSession()
  const user = session && session.user
  const isUserAdmin = isAdmin(user)
  const agencyId = isUserAdmin ? -1 : parseInt(user?.role)
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const [order, setOrder] = useState('recent')
  const { reviews, error, totalPages } = useReviews(
    page,
    limit,
    agencyId,
    order
  )

  if (error) return <div>Failed to load</div>
  return (
    <>
      <h1 className="text-2xl font-bold">Reviews</h1>
      <div className="flex justify-between">
        <SelectLimit setLimit={setLimit} />
        <SelectOrder
          orderData={SelectOrder.ReviewOrder}
          order={order}
          setOrder={setOrder}
        />
      </div>
      {reviews && (
        <>
          <Table>
            <Table.Head disableEdit disableDelete={!isUserAdmin}>
              <th>ID</th>
              <th>Place</th>
              <th>User</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Created At</th>
            </Table.Head>
            <Table.Body>
              {reviews.map((review, index) => (
                <tr key={index}>
                  <Table.Row>{review.id}</Table.Row>
                  <Table.Row>{review.place_title}</Table.Row>
                  <Table.Row>{review.user.name}</Table.Row>
                  <Table.Row>{review.rate}</Table.Row>
                  <Table.Row>{review.comment}</Table.Row>
                  <Table.Row>{review.created_at}</Table.Row>
                  {isUserAdmin && (
                    <Table.Row>
                      <Table.DeleteButton />
                    </Table.Row>
                  )}
                </tr>
              ))}
            </Table.Body>
          </Table>
          <PaginationButton
            currentPage={page}
            onPageChange={setPage}
            totalPages={totalPages}
          />
        </>
      )}
    </>
  )
}

Reviews.layout = Admin

export default Reviews
