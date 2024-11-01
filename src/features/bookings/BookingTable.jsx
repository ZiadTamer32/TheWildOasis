import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { bookings, isLoading } = useBookings();

  // Filter
  const [searchParams] = useSearchParams();
  const filterBy = searchParams.get("status") || "all";
  let filterValue = bookings;

  if (filterBy === "checked-out")
    filterValue = filterValue?.filter(
      (booking) => booking.status === "checked-out"
    );
  if (filterBy === "checked-in")
    filterValue = filterValue?.filter(
      (booking) => booking.status === "checked-in"
    );
  if (filterBy === "unconfirmed")
    filterValue = filterValue?.filter(
      (booking) => booking.status === "unconfirmed"
    );

  const count = filterValue?.length;

  // Sort
  const sortBy = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  let sortValue = filterValue;
  if (field) {
    sortValue?.sort((a, b) => {
      if (typeof a[field] === "string") {
        return a[field].localeCompare(b[field]) * modifier;
      } else {
        return (a[field] - b[field]) * modifier;
      }
    });
  }

  if (isLoading) return <Spinner />;
  if (!bookings?.length) return <Empty resource="Bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortValue}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
