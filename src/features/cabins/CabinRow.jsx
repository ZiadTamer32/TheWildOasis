import styled from "styled-components";
import PropTypes from "prop-types"; // Import PropTypes
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import CreateCabinForm from "./CreateCabinForm";
import { HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import { useCabinCreate } from "./apiCreate";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  margin: 5px 0px 5px 10px;
`;

const CabinName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const Capacity = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-500);
`;

function CabinRow({ cabin }) {
  // const [showForm, setShowForm] = useState(false);
  const { createCabin } = useCabinCreate();

  const {
    id: cabinID,
    name,
    image,
    maxCapacity,
    regularPrice,
    discount,
    description
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      image,
      maxCapacity,
      regularPrice,
      discount,
      description
    });
  }
  const ReactQueryClient = useQueryClient();
  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin Successfully deleted");
      ReactQueryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message)
  });

  return (
    <>
      <Table.Row role="row">
        <Img src={image} alt={name} />
        <CabinName>{name}</CabinName>
        <Capacity>Fits up to {maxCapacity} guests</Capacity>
        <Price>{regularPrice}</Price>
        <Discount>{discount}</Discount>
        <div>
          <Modal>
            <Menus>
              <Menus.Toggle id={`${cabinID}`} />
              <Menus.List id={`${cabinID}`}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                >
                  Duplicate
                </Menus.Button>

                <Modal.Open opens="edit">
                  <Menus.Button
                    icon={<HiPencil />}
                    onClick={() => open((show) => !show)}
                  >
                    Edit
                  </Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="Cabins"
                  disabled={isDeleting}
                  onConfirm={() => mutate(cabinID)}
                />
              </Modal.Window>
            </Menus>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

// Define PropTypes for validation
CabinRow.propTypes = {
  cabin: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    maxCapacity: PropTypes.number.isRequired,
    regularPrice: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired
};

export default CabinRow;

// onClick={() => setShowForm((show) => !show)}

//<button disabled={isDeleting} onClick={() => mutate(cabinID)}></button>
