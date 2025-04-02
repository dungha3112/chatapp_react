import { RiDeleteBin6Fill } from "react-icons/ri";
import {
  MessageAttachmentContainerStyle,
  MessageAttachmentStyle,
} from "../../../styles/messages";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import MessageImageCanvas from "./MessageImageCanvas";
import { removeAttachment } from "../../../store/message-panel/messagePanelSlice";

const MessageAttachmentContainer = () => {
  const { attachments } = useSelector((state: RootState) => state.messagePanel);
  const dispatch = useDispatch<AppDispatch>();
  const removeFile = (index: number) => {
    dispatch(removeAttachment(index));
  };

  return (
    <MessageAttachmentContainerStyle>
      {attachments.map((file, index) => (
        <MessageAttachmentStyle
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <MessageImageCanvas file={file} />
          <RiDeleteBin6Fill
            className="icon"
            onClick={() => removeFile(index)}
          />
          {/* <div>{file.name}</div> */}
        </MessageAttachmentStyle>
      ))}
    </MessageAttachmentContainerStyle>
  );
};

export default MessageAttachmentContainer;
