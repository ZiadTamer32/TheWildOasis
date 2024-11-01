import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useDelete() {
  const ReactQueryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleting, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      toast.success("Booking Successfully deleted");
      ReactQueryClient.invalidateQueries({ queryKey: ["booking"] });
      navigate("/bookings");
    },
    onError: (err) => toast.error(err.message)
  });
  return { deleting, isDeleting };
}

export default useDelete;
