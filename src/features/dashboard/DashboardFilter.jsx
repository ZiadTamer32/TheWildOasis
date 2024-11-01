import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { value: "7", Label: "Last 7 days" },
        { value: "30", Label: "Last 30 days" },
        { value: "90", Label: "Last 90 days" }
      ]}
    />
  );
}

export default DashboardFilter;
