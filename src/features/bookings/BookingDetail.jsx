import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useBooking from "./useBooking";
import useCheckOut from "./useCheckout ";
import useDelete from "./useDelete";
import Modal from "../../ui/Modal";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkOut, isCheckOut } = useCheckOut();
  const { deleting, isDeleting } = useDelete();
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver"
  };
  if (isLoading || isCheckOut || isDeleting) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag type={statusToTagName[booking.status]}>
            {booking.status.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {booking.status === "unconfirmed" && (
          <Button
            variation="primary"
            onClick={() => navigate(`/checkin/${booking.id}`)}
          >
            Check in
          </Button>
        )}
        {booking.status === "checked-in" && (
          <Button variation="primary" onClick={() => checkOut(booking.id)}>
            Check Out
          </Button>
        )}
        <Modal>
          <Modal.Open>
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>
          <Modal.Window>
            <ConfirmDelete
              disabled={isDeleting}
              onConfirm={() => deleting(booking.id)}
              resourceName="Booking"
            />
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
