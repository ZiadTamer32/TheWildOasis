import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  const [addCabin, setAddCabin] = useState(false);
  return (
    <>
      <Button onClick={() => setAddCabin((show) => !show)}>Add Cabin</Button>
      {addCabin && (
        <Modal setAddCabin={() => setAddCabin(false)}>
          <CreateCabinForm setAddCabin={() => setAddCabin(false)} />
        </Modal>
      )}
    </>
  );
}

export default AddCabin;
