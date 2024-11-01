import styled from "styled-components";
import { useRecentDate } from "./useRecentDate";
import { useStays } from "./useStays";
import { useCabins } from "../cabins/useCabins";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, numDays, isLoading1 } = useRecentDate();
  const { ConfirmStayDays, isLoading2 } = useStays();
  const { cabins, isLoading3 } = useCabins();
  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        numDays={numDays}
        ConfirmStayDays={ConfirmStayDays}
        cabinCount={cabins?.length}
      />

      <TodayActivity />
      <DurationChart ConfirmStayDays={ConfirmStayDays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;