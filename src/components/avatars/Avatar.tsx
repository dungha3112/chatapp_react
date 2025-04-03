import { UserAvatarContainer } from "../../styles/avatar";
import { Size } from "../../styles/styleTypes";

type Props = {
  url: string;
  size: Size;
};

const Avatar = ({ size, url }: Props) => {
  return <UserAvatarContainer $size={size} $url={url} />;
};

export default Avatar;
