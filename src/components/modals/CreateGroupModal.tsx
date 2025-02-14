import React, { createRef, Dispatch, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { ModalContainer, ModalContentBody } from ".";
import { ButtonIconStyle, ModalHeaderStyle, OverlayStyle } from "../../styles";
import CreateGroupForm from "../forms/CreateGroupForm";

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};
const CreateGroupModal = ({ setShowModal }: Props) => {
  const ref = createRef<HTMLDivElement>();

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) =>
      e.key === "Escape" && setShowModal(false);
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [setShowModal]);

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { current } = ref;
    if (current === e.target) {
      setShowModal(false);
    }
  };

  return (
    <OverlayStyle ref={ref} onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeaderStyle>
          <h2>Create a new group</h2>

          <ButtonIconStyle onClick={() => setShowModal(false)}>
            <MdClose size={20} color="red" />
          </ButtonIconStyle>
        </ModalHeaderStyle>

        <ModalContentBody>
          <CreateGroupForm setShowModal={setShowModal} />
        </ModalContentBody>
      </ModalContainer>
    </OverlayStyle>
  );
};

export default CreateGroupModal;
