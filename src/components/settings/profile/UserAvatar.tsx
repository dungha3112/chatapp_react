import { Dispatch, SetStateAction, useRef } from "react";
import { FileInput } from "../../../styles/inputs/textarea";
import { UserAvatarContainer } from "../../../styles/settings";
import { DivMouseEventType, InputChangeEventType } from "../../../utils/types";

type Props = {
  avatarSource: string;
  avatarSourceCopy: string;
  setAvatarSourceCopy: Dispatch<SetStateAction<string>>;
  setAvatarFile: Dispatch<SetStateAction<File | undefined>>;
};

const UserAvatar = ({
  avatarSource,
  avatarSourceCopy,
  setAvatarSourceCopy,
  setAvatarFile,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = (e: DivMouseEventType) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const onFileChange = (e: InputChangeEventType) => {
    const file = e.target.files?.item(0);
    setAvatarSourceCopy(file ? URL.createObjectURL(file) : avatarSource);
    setAvatarFile(file || undefined);
  };

  return (
    <>
      <UserAvatarContainer
        $url={avatarSourceCopy}
        $isChange={true}
        onClick={handleAvatarClick}
      />
      <FileInput
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={onFileChange}
      />{" "}
    </>
  );
};

export default UserAvatar;
