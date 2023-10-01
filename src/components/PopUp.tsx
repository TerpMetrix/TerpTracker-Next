import Modal from "react-modal";
import { type StrainWithRelations } from "@/server/database/strains";
import { type ProducerWithRelations } from "@/server/database/producers";
import Link from "next/link";
import Image from "next/image";
import { XCircle } from "lucide-react";

type PopUpProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  data: StrainWithRelations | ProducerWithRelations;
};

const PopUp: React.FC<PopUpProps> = ({ isOpen, onRequestClose, data }) => {
  if ("thc" in data) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Strain Pop Up"
      >
        <h1 className="mb-4 text-2xl font-bold text-slate-900">
          Currently Available At
        </h1>
        {/* Map thru shops (add links ot websites) */}
        <ul>
          {data.shops?.map((shop) => {
            return (
              <li key={shop.id}>
                <Link href={shop.website}>
                  <div className="m-auto flex w-11/12 flex-row items-center justify-center gap-4 rounded-full border-2 border-green-900 p-4 md:w-1/3">
                    <Image
                      className="rounded-full border-2"
                      src={shop.bannerImage}
                      alt={shop.name}
                      width={80}
                      height={80}
                    />
                    <h2 className="mb-1 text-xl font-bold text-green-900 underline">
                      {shop.name}
                    </h2>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <button className="absolute right-2 top-2" onClick={onRequestClose}>
          <XCircle />
        </button>
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
