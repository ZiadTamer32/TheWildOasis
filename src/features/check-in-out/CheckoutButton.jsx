import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import useCheckOut from "../bookings/useCheckOut ";

function CheckoutButton({ bookingId }) {
  const { checkOut, isCheckOut } = useCheckOut();
  return (
    <Button
      variation="primary"
      size="small"
      disabled={isCheckOut}
      onClick={() => checkOut(bookingId)}
    >
      {isCheckOut ? <SpinnerMini /> : "Check out"}
    </Button>
  );
}

export default CheckoutButton;
