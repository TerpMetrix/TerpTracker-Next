import react from "react";
import type { Strain, Producer } from "@/server/database/types";

type ModalProps = {
  data: Strain | Producer;
};

const Modal: React.FC<ModalProps> = ({ data }) => {
  if ("THC" in data) {
    return (
      <>
        <dialog id={`my_modal_${data.id}`} className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="text-lg font-bold">Hello!</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </div>
          </form>
        </dialog>
      </>
    );
  } else if ("bannerImage" in data) {
    return (
      <>
        <dialog id={`my_modal_${data.id}`} className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="text-lg font-bold">Hello!</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </div>
          </form>
        </dialog>
      </>
    );
  } else {
    return <> </>;
  }
};

export default Modal;
