import React, { createRef, Dispatch, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { ModalContainer, ModalContentBody } from ".";
import { ModalHeaderStyle, OverlayStyle } from "../../styles";
import CreateConversationForm from "../forms/CreateConversationForm";

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};
const CreateConversationModal = ({ setShowModal }: Props) => {
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
          <h2>Create a Conversation</h2>
          <MdClose size={32} onClick={() => setShowModal(false)} />
        </ModalHeaderStyle>

        <ModalContentBody>
          {/* <ConversationTypeForm type={type} setType={setType} /> */}
          <CreateConversationForm setShowModal={setShowModal} />
        </ModalContentBody>
      </ModalContainer>
    </OverlayStyle>
  );
};

export default CreateConversationModal;
