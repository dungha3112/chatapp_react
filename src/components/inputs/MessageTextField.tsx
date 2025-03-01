import React, { useState } from "react";
import { MessageTextarea } from "../../styles/inputs/Textarea";

const MessageTextField = () => {
  const [message, setMessage] = useState<string>("");

  const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  return (
    <MessageTextarea
      value={message}
      onChange={onMessageChange}
      placeholder="Write something ..."
    />
  );
};

export default MessageTextField;
