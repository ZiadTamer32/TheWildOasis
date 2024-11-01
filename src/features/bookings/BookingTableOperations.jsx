import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", Label: "All" },
          { value: "checked-out", Label: "Checked out" },
          { value: "checked-in", Label: "Checked in" },
          { value: "unconfirmed", Label: "Unconfirmed" }
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high first)"
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" }
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
