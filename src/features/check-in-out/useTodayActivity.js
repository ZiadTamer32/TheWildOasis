import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodatyActivity() {
  const { data: activities, isLoading } = useQuery({
    queryKey: ["today-activites"],
    queryFn: getStaysTodayActivity
  });
  return { isLoading, activities };
}
