import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { updateType } from "../../store/selectedSlice";
import {
  ConversationSelectedItem,
  ConversationSelectedStyle,
} from "../../styles/conversations";
import { chatTypes } from "../../utils/constants";
import { SelectedConversationType } from "../../utils/types";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ConversationSelected = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const currentChatType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );

  const handleSelectType = (type: SelectedConversationType) => {
    localStorage.setItem("currentChatType", type as SelectedConversationType);

    if (type === "private") {
      navigate("/conversation");
    } else {
      navigate("/group");
    }
  };

  const currentChatTypeLocalStorage = localStorage.getItem(
    "currentChatType"
  ) as SelectedConversationType;

  useEffect(() => {
    if (currentChatTypeLocalStorage !== null) {
      dispatch(updateType(currentChatTypeLocalStorage));
    }

    if (pathname)
      if (pathname.slice(1) === "conversation") {
        localStorage.setItem("currentChatType", "private");
        dispatch(updateType("private"));
      } else {
        localStorage.setItem("currentChatType", "group");
        dispatch(updateType("group"));
      }
  }, [currentChatTypeLocalStorage, dispatch, pathname]);

  return (
    <ConversationSelectedStyle>
      {chatTypes.map((chat) => (
        <ConversationSelectedItem
          $selected={chat.type === currentChatType}
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
