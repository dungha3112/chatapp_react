import { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { deleteFriendThunk } from "../../../store/friends/friendsThunk";
import { FriendListItemContainer } from "../../../styles/friend";
import { AuthContext } from "../../../utils/contexts/AuthContext";
import { getUserFriendInstance } from "../../../utils/helpers";
import { FriendType } from "../../../utils/types";
import { checkConversationOrCreate } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import Avatar from "../../avatars/Avatar";
import avatarDefatult from "../../../assets/default_avatar.jpg";

type Props = {
  friend: FriendType;
  online?: boolean;
};
const FriendListItem = ({ friend, online }: Props) => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleDeleteFriend = () => {
    dispatch(deleteFriendThunk(friend.id));
  };

  const recipient = getUserFriendInstance(user, friend);
  const handleSendMessageOrCreateNewConversation = async () => {
    if (!recipient) return;

    checkConversationOrCreate(recipient.id)
      .then((res) => {
        navigate(`/conversations/${res?.data.id}`);
      })
      .catch((err) => console.log(err));
  };

  const avatarString = recipient?.profile?.avatar?.secure_url
    ? String(recipient?.profile?.avatar?.secure_url)
    : String(avatarDefatult);

  return (
    <FriendListItemContainer onClick={handleSendMessageOrCreateNewConversation}>
      <div className="userDetails">
        <div className="avatar">
          <Avatar size="md" url={avatarString} />
          {online && <GoDotFill fontSize={20} className="online" />}
        </div>
        <div className="nameAndMessage">
          <div className="name">
            {user?.id === friend.sender.id
              ? friend.receiver.username
              : friend.sender.username}
          </div>

          <div className="message">Hi How are you ?</div>
        </div>
      </div>

      <AiFillDelete
        className="icon"
        onClick={(e) => {
          e.stopPropagation(); // Ngăn chặn sự kiện lan truyền lên phần tử cha
          handleDeleteFriend();
        }}
        cursor="pointer"
      />
    </FriendListItemContainer>
  );
};

export default FriendListItem;
