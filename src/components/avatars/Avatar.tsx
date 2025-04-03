import { UserAvatarContainer } from "../../styles/avatar";
import { Size } from "../../styles/styleTypes";
import { UserType } from "../../utils/types";
import avatarDefault from "../../assets/default_avatar.jpg";

type Props = {
  user?: UserType;
  size: Size;
};

const Avatar = ({ size, user }: Props) => {
  const avatarString = user?.profile?.avatar?.secure_url
    ? user?.profile?.avatar?.secure_url
    : avatarDefault;

  return <UserAvatarContainer $size={size} $url={avatarString} />;
};

export default Avatar;
