import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useChecking from "../bookings/useChecking";
import { useSettings } from "../settings/apiSettings";
// import useCheckOut from "../bookings/useCheckout ";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [hasBreakFast, setHasBreakFast] = useState(false);
  const { booking, isLoading } = useBooking();
  const moveBack = useMoveBack();

  const { settings, isLoading: isSettingsLoading } = useSettings();
  useEffect(() => setIsConfirmed(booking?.isPaid ?? false), [booking]);

  const { checkIn, isChecking } = useChecking();
  // const { checkOut, isCheckOut } = useCheckOut();

  const optinalBreakFast =
    settings?.breakfastPrice * booking?.numGuests * booking?.numNights;
  console.log(optinalBreakFast);

  function handleCheckin() {
    if (!isConfirmed) return;

    if (hasBreakFast) {
      checkIn({
        id: booking.id,
        breakFast: {
          hasBreakfast: true,
          extrasPrice: optinalBreakFast,
          totalPrice: optinalBreakFast + booking.totalPrice
        }
      });
    } else {
      checkIn({ id: booking.id, breakFast: {} });
    }
  }
  if (isLoading || isSettingsLoading) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{booking.id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          id="breakfast"
          checked={hasBreakFast}
          onChange={() => {
            setHasBreakFast((s) => !s);
            setIsConfirmed(false);
          }}
        >
          Want to add breakfast for {formatCurrency(optinalBreakFast)}?
        </Checkbox>
      </Box>

      <Box>
        <Checkbox
          id="confirm"
          onChange={() => setIsConfirmed((s) => !s)}
          disabled={isConfirmed || isChecking}
          checked={isConfirmed}
        >
          I confirm that {booking.guests.fullName} has paid the total amount{" "}
          {hasBreakFast
            ? formatCurrency(booking.totalPrice + optinalBreakFast)
            : formatCurrency(booking.totalPrice)}{" "}
          {hasBreakFast &&
            `(${formatCurrency(booking.totalPrice)} +
            ${formatCurrency(optinalBreakFast)})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!isConfirmed || isChecking}>
          Check in booking #{booking.id}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
