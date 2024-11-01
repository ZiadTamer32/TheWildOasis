import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserApi } from "../../services/apiAuth";

export function useUpdateUser() {
  const ReactQueryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editUser } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      toast.success("User Successfully Updated");
      ReactQueryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => toast.error(err.message)
  });
  return { isEditing, editUser };
}
