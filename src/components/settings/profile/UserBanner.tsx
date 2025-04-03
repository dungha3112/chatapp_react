import React, { SetStateAction, useRef } from "react";
import { FileInput } from "../../../styles/inputs/textarea";
import { SettingsProfileBanner } from "../../../styles/settings";
import { DivMouseEventType, InputChangeEventType } from "../../../utils/types";

type Props = {
  bannerSource: string;
  bannerSourceCopy: string;
  setBannerSourceCopy: React.Dispatch<SetStateAction<string>>;
  setBannerFile: React.Dispatch<SetStateAction<File | undefined>>;
};

const UserBanner = ({
  bannerSource,
  bannerSourceCopy,
  setBannerSourceCopy,
  setBannerFile,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBannerClick = (e: DivMouseEventType) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const onFileChange = (e: InputChangeEventType) => {
    const file = e.target.files?.item(0);
    setBannerSourceCopy(file ? URL.createObjectURL(file) : bannerSource);
    setBannerFile(file || undefined);
  };

  return (
    <>
      <SettingsProfileBanner
        $isChange={true}
        $backgroundUrl={bannerSourceCopy}
        onClick={handleBannerClick}
      />

      <FileInput
        type="file"
        accept="images/*"
        ref={fileInputRef}
        onChange={onFileChange}
      />
    </>
  );
};

export default UserBanner;
