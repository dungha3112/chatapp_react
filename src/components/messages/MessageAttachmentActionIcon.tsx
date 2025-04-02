import { useRef } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.scss";
import { AppDispatch, RootState } from "../../store";
import { useToast } from "../../utils/hooks/useToast";
import { DivMouseEventType, InputChangeEventType } from "../../utils/types";
import { addAttachment } from "../../store/message-panel/messagePanelSlice";
import { FileInput } from "../../styles/inputs/textarea";

const MessageAttachmentActionIcon = () => {
  const attachmentRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { attachments } = useSelector((state: RootState) => state.messagePanel);

  const dispatch = useDispatch<AppDispatch>();
  const { error } = useToast({ theme: "dark" });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onClick = (e: DivMouseEventType) => fileInputRef.current?.click();

  const onChange = (e: InputChangeEventType) => {
    const { files } = e.target;
    if (!files) return;

    const maxFilesDropped = 5 - attachments.length;
    if (maxFilesDropped === 0)
      return error("Max files reached", { position: "top-center" });

    const filesArray = Array.from(files).slice(0, maxFilesDropped);

    for (let i = 0; i < filesArray.length; i++) {
      if (filesArray[i].size > 10 * 1024 * 1024) {
        return error(`Size ${filesArray[i].name} > 10mb`, {
          position: "top-center",
        });
      }
      dispatch(addAttachment(filesArray[i]));
    }
  };

  return (
    <div ref={attachmentRef} onClick={onClick}>
      <AiFillPlusCircle className={styles.icon} />
      <FileInput
        type="file"
        // accept="image/*,video/*"
        accept="*"
        maxLength={5}
        multiple
        ref={fileInputRef}
        onChange={onChange}
      />
    </div>
  );
};

export default MessageAttachmentActionIcon;
