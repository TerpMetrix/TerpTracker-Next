import react from "react";
import Modal from "react-modal";
import type { Strain, Producer } from "@/server/database/types";
import { ProducerWithRelations } from "@/server/database/producers";

type PopUpProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  data: Strain | ProducerWithRelations;
};

const PopUp: React.FC<PopUpProps> = ({ isOpen, onRequestClose, data }) => {
  if ("THC" in data) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Example Modal"
      >
        <h2>{data.name}</h2>
        <button onClick={onRequestClose}>Close Modal</button>
      </Modal>
    );
  } else if ("bannerImage" in data) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Example Modal"
      >
        <h2>{data.name}</h2>
        <button onClick={onRequestClose}>Close Modal</button>
      </Modal>
    );
  } else {
    return <></>;
  }
};

export default PopUp;
