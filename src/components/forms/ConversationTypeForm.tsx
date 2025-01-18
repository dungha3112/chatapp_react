import React from "react";
import styles from "./index.module.scss";
import { SelectedConversationType } from "../../utils/types";
import { chatTypes } from "../../utils/constants";

type Props = {
  type: SelectedConversationType;
  setType: React.Dispatch<React.SetStateAction<SelectedConversationType>>;
};
const ConversationTypeForm = ({ type, setType }: Props) => {
  return (
    <form className={styles.conversationTypeForm}>
      {chatTypes.map((chatType) => (
        <div key={chatType.type}>
          <input
            className={styles.radio}
            type="radio"
            name="conversationType"
            id={chatType.type}
            checked={type === chatType.type}
            onChange={() => setType(chatType.type)}
          />
          <label className={styles.radioLabel} htmlFor={chatType.type}>
            {chatType.lable}
          </label>
        </div>
      ))}
    </form>
  );
};

export default ConversationTypeForm;
