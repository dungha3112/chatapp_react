import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { updateType } from "../../store/selectedSlice";
import {
  ConversationSelectedItem,
  ConversationSelectedStyle,
} from "../../styles/conversationSidebar";
import { chatTypes } from "../../utils/constants";
import { SelectedConversationType } from "../../utils/types";

const ConversationSelected = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const conversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );

  const handleSelectType = (type: SelectedConversationType) => {
    dispatch(updateType(type));
    if (type === "private") {
      navigate("/conversation");
    } else {
      navigate("/group");
    }
  };

  return (
    <ConversationSelectedStyle>
      {chatTypes.map((chat) => (
        <ConversationSelectedItem
          $selected={chat.type === conversationType}
          key={chat.type}
          className="item"
          onClick={() => handleSelectType(chat.type)}
        >
          {chat.lable}
        </ConversationSelectedItem>
      ))}
    </ConversationSelectedStyle>
  );
};

export default ConversationSelected;
