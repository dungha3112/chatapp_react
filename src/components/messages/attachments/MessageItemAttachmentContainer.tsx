import { useState } from "react";
import { MdClose } from "react-icons/md";
import { OverlayStyle } from "../../../styles";
import { useKeydown } from "../../../utils/hooks";
import { GroupMessageType, MessageType } from "../../../utils/types";
import styles from "./index.module.scss";

type Props = {
  message: MessageType | GroupMessageType;
};

const MessageItemAttachmentContainer = ({ message }: Props) => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const [imageUrl, setImageUrl] = useState<string>("");

  const onClick = (url: string) => {
    setShowOverlay(true);
    setImageUrl(url);
  };

  const handleKeydown = (e: KeyboardEvent) =>
    e.key === "Escape" && setShowOverlay(false);
  useKeydown(handleKeydown);

  return (
    <>
      {showOverlay && (
        <OverlayStyle>
          <MdClose
            className={styles.closeIcon}
            onClick={() => setShowOverlay(false)}
          />
          <img src={imageUrl} alt="overlay" style={{ maxHeight: "90%" }} />
        </OverlayStyle>
      )}

      {message.attachments && message.attachments.length > 0 && (
        <div style={{}}>
          {message.attachments.map((attachment) => (
            <img
              src={attachment.secure_url}
              key={attachment.key}
              alt={attachment.key}
              width={300}
              height={300}
              style={{
                cursor: "pointer",
                objectFit: "cover",
              }}
              onClick={() => onClick(attachment.secure_url)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default MessageItemAttachmentContainer;
