import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { ConversationChatTypeData } from "../../utils/types";
import { updateType } from "../../store/selectedSlice";
import {
  ConversationTabItemStyle,
  ConversationTabStyle,
} from "../../styles/conversationSidebar";
import { chatTypes } from "../../utils/constants";

const ConversationTab = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const conversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );

  const handleOnSelectType = (chat: ConversationChatTypeData) => {
    dispatch(updateType(chat.type));
    if (chat.type === "private") navigate("/conversations");
    else navigate("/groups");
  };

  return (
    <ConversationTabStyle>
      {chatTypes.map((chat) => (
        <ConversationTabItemStyle
          key={chat.type}
          $selected={chat.type === conversationType}
          className="item"
          onClick={() => handleOnSelectType(chat)}
        >
          {chat.lable}
        </ConversationTabItemStyle>
      ))}
    </ConversationTabStyle>
  );
};

export default ConversationTab;
