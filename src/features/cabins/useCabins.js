import { useQuery } from "@tanstack/react-query";
import { getCabin } from "../../services/apiCabins";

export function useCabins() {
  const { data: cabins, isLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabin
  });
  return { cabins, isLoading };
}
