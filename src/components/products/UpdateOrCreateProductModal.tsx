import { Modal } from "flowbite-react";
import { Dispatch, FC, PropsWithChildren } from "react";

type Props = {
  show: boolean;
  setShow: Dispatch<React.SetStateAction<boolean>>;
  id?: number;
};

export const UpdateOrCreateProductModal: FC<PropsWithChildren<Props>> = ({
  setShow,
  show,
  children,
  id,
}) => {
  return (
    <Modal show={show} onClose={() => setShow(false)}>
      <Modal.Header>{`${id ? "Actualizar" : "Crear"} producto`}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">{children}</div>
      </Modal.Body>
    </Modal>
  );
};
