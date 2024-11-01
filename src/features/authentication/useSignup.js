import { useMutation } from "@tanstack/react-query";
import { SignUp as SignUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: SignUpApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verfiy the new account from the user's email address."
      );
    }
  });
  return { signup, isLoading };
}
