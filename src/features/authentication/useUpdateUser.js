import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserApi } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editUser } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: (user) => {
      toast.success("User successfully updated!");
      queryClient.invalidateQueries(["user"], user);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update user.");
    }
  });

  return { isEditing, editUser };
}
