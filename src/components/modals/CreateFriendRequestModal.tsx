import { createRef, Dispatch, SetStateAction, useEffect } from "react";
import { ButtonIconStyle, OverlayStyle } from "../../styles";
import { ModalContainer, ModalContentBody, ModalHeader } from ".";
import { MdClose } from "react-icons/md";
import { ContextMenuEventType } from "../../utils/types";
import SendFriendRequestForm from "../forms/SendFriendRequestForm";

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};
const CreateFriendRequestModal = ({ setShowModal }: Props) => {
  const ref = createRef<HTMLDivElement>();

  const handleOverlayClick = (e: ContextMenuEventType) => {
    const { current } = ref;
    if (current === e.target) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) =>
      e.key === "Escape" && setShowModal(false);
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [setShowModal]);

  return (
    <OverlayStyle ref={ref} onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <h2>Send a Friend Request</h2>
          <ButtonIconStyle onClick={() => setShowModal(false)}>
            <MdClose size={20} color="red" />
          </ButtonIconStyle>
        </ModalHeader>
        <ModalContentBody>
          <SendFriendRequestForm setShowModal={setShowModal} />
        </ModalContentBody>
      </ModalContainer>
    </OverlayStyle>
  );
};

export default CreateFriendRequestModal;
