import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useChecking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkIn, isLoading: isChecking } = useMutation({
    mutationFn: ({ id, breakFast }) =>
      updateBooking(id, { status: "checked-in", isPaid: true, ...breakFast }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} is checked-in successfully`);
      queryClient.invalidateQueries({ active: true }), navigate("/");
    },
    onError: () => toast.error("There is an Error")
  });
  return { checkIn, isChecking };
}

export default useChecking;
