import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "./useCheckOut";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({ booking }) {
  const navigate = useNavigate();
  const {
    id,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests,
    cabins
  } = booking;

  const guestName = guests?.fullName;
  const email = guests?.email;
  const cabinName = cabins?.name;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver"
  };
  const { checkOut } = useCheckOut();
  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Menus>
        <Menus.Toggle id={String(id)} />
        <Menus.List id={String(id)}>
          <Menus.Button
            icon={<HiEye />}
            onClick={() => navigate(`/bookings/${id}`)}
          >
            See Details
          </Menus.Button>
          {booking.status === "unconfirmed" && (
            <Menus.Button
              icon={<HiArrowDownOnSquare />}
              onClick={() => navigate(`/checkin/${id}`)}
            >
              Check In
            </Menus.Button>
          )}
          {booking.status === "checked-in" && (
            <Menus.Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => checkOut(id)}
            >
              Check Out
            </Menus.Button>
          )}
        </Menus.List>
      </Menus>
    </Table.Row>
  );
}

export default BookingRow;
