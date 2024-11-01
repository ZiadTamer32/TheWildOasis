import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { Page_Size } from "../../utils/constant";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const { data: { data: bookings, count } = {}, isLoading } = useQuery({
    queryKey: ["bookings", page],
    queryFn: () => getBookings({ page })
  });
  const pageCount = Math.ceil(count / Page_Size);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", page + 1],
      queryFn: () => getBookings({ page: page + 1 })
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", page - 1],
      queryFn: () => getBookings({ page: page - 1 })
    });
  }
  return { count, bookings, isLoading };
}
