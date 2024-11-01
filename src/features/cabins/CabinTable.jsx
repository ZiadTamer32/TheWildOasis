import Spinner from "../../ui/Spinner";
import { useCabins } from "./useCabins";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();
  const filterDiscount = searchParams.get("discount") || "all";

  if (isLoading) return <Spinner />;

  // Filter
  let filteredCabins = cabins;
  if (filterDiscount === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterDiscount === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // Sort
  const sortBy = searchParams.get("sortBy") || "";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  let sortedCabins = filteredCabins;

  if (field) {
    sortedCabins = filteredCabins.sort((a, b) => {
      if (typeof a[field] === "string") {
        return a[field].localeCompare(b[field]) * modifier;
      } else {
        return (a[field] - b[field]) * modifier;
      }
    });
  }

  return (
    <div>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 0.5fr">
        <Table.Header role="row">
          <div>Img</div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </div>
  );
}

export default CabinTable;
