import { LabelAnimation } from "../../styles";
import { UserType } from "../../utils/types";
import Avatar from "../avatars/Avatar";
import styles from "./index.module.scss";

type Props = {
  isAvatar: boolean;
  userTyping?: UserType;
};
const UserTyping = ({ isAvatar, userTyping }: Props) => {
  const fullName =
    userTyping?.firstName + " " + userTyping?.lastName + " typing ...";

  return (
    <div className={styles.container}>
      {isAvatar && <Avatar size="sm" user={userTyping} />}
      <div
        style={{
          display: "flex",
          flexDirection: isAvatar ? "column" : "row",
          gap: isAvatar ? "" : "5px",
        }}
      >
        <LabelAnimation
          style={{ fontSize: isAvatar ? "14px" : "10px" }}
          $animation={true}
          $length={fullName.length}
        >
          {fullName.split("").map((char, index) => (
            <span key={index}>{char === " " ? "\u00A0" : char}</span>
          ))}
        </LabelAnimation>
      </div>
    </div>
  );
};

export default UserTyping;
