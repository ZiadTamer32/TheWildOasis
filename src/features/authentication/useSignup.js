import { useMutation } from "@tanstack/react-query";
import { SignUp as SignUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: SignUpApi,
    onSuccess: () => {
      toast.success("Account successfully created!");
    },
    onError: (error) => {
      toast.error(
        error.message || "Failed to create account. Please try again."
      );
    }
  });
  return { signup, isLoading };
}
