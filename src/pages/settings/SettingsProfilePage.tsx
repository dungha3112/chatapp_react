import { useContext, useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import UserAvatar from "../../components/settings/profile/UserAvatar";
import UserBanner from "../../components/settings/profile/UserBanner";
import {
  Button,
  ButtonIconStyle,
  LabelAnimation,
  OverlayStyle,
} from "../../styles";
import {
  ProfileAboutSection,
  ProfileAboutSectionHeader,
  ProfileDescriptionField,
  ProfileEditBottomActionBar,
  ProfileSection,
  SettingPage,
  SettingsProfileUserDetails,
} from "../../styles/settings";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { updateUserProfileApi } from "../../utils/api";
import { useToast } from "../../utils/hooks/useToast";

const SettingsProfilePage = () => {
  const { user, updateAuthUser } = useContext(AuthContext);
  const { error } = useToast();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  // about
  const [about, setAbout] = useState(user?.profile?.about || "");
  const [aboutCopy, setAboutCopy] = useState(about);

  //avatar
  const [avatarSource, setAvatarSource] = useState(
    user?.profile?.avatar?.secure_url || ""
  );
  const [avatarFile, setAvatarFile] = useState<File>();
  const [avatarSourceCopy, setAvatarSourceCopy] = useState(avatarSource);

  // banner
  const [bannerSource, setBannerSource] = useState(
    user?.profile?.banner?.secure_url || ""
  );
  const [bannerFile, setBannerFile] = useState<File>();
  const [bannerSourceCopy, setBannerSourceCopy] = useState(bannerSource);

  useEffect(() => {
    setAbout(String(user?.profile?.about));

    setBannerSource(String(user?.profile?.banner?.secure_url));
    setAvatarSource(String(user?.profile?.avatar?.secure_url));
  }, [
    user?.profile?.about,
    user?.profile?.avatar?.secure_url,
    user?.profile?.banner?.secure_url,
  ]);

  const isChanged = () => aboutCopy !== about || bannerFile || avatarFile;

  const reset = () => {
    setAboutCopy(about);
    setBannerSourceCopy(bannerSource);
    setAvatarSourceCopy(avatarSource);

    setIsEditing(false);

    setAvatarFile(undefined);
    setBannerFile(undefined);

    URL.revokeObjectURL(bannerSourceCopy);
    URL.revokeObjectURL(avatarSourceCopy);
  };

  const save = async () => {
    const formData = new FormData();
    if (bannerFile) formData.append("banner", bannerFile);
    if (avatarFile) formData.append("avatar", avatarFile);
    if (about !== aboutCopy) formData.append("about", aboutCopy);

    try {
      setLoading(true);
      console.log(formData);

      const res = await updateUserProfileApi(formData);

      URL.revokeObjectURL(bannerSourceCopy);
      URL.revokeObjectURL(avatarSourceCopy);

      setBannerFile(undefined);
      setAvatarFile(undefined);

      updateAuthUser(res?.data);
      setIsEditing(false);
    } catch (err) {
      error(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <OverlayStyle>
          <LabelAnimation
            style={{ fontSize: "20px" }}
            $animation={true}
            $length={"Loading ...".length}
          >
            {"Loading ...".split("").map((char, index) => (
              <span key={index}>{char}</span>
            ))}
          </LabelAnimation>
        </OverlayStyle>
      )}

      <SettingPage>
        <UserBanner
          bannerSource={bannerSource}
          bannerSourceCopy={bannerSourceCopy}
          setBannerSourceCopy={setBannerSourceCopy}
          setBannerFile={setBannerFile}
        />

        <ProfileSection>
          <SettingsProfileUserDetails>
            <UserAvatar
              avatarSource={avatarSource}
              avatarSourceCopy={avatarSourceCopy}
              setAvatarSourceCopy={setAvatarSourceCopy}
              setAvatarFile={setAvatarFile}
            />
            <span>@username</span>
          </SettingsProfileUserDetails>

          <ProfileAboutSection>
            <ProfileAboutSectionHeader>
              <label htmlFor="about">About Me</label>

              <ButtonIconStyle
                className={`${isEditing && "actived"}`}
                onClick={() => setIsEditing(!isEditing)}
              >
                <MdModeEdit size={28} cursor="pointer" />
              </ButtonIconStyle>
            </ProfileAboutSectionHeader>

            <ProfileDescriptionField
              id="about"
              maxLength={200}
              disabled={!isEditing}
              placeholder="Write something ..."
              value={aboutCopy.slice(0, 200)}
              onChange={(e) => {
                if (e.target.value.length <= 200) {
                  setAboutCopy(e.target.value);
                }
              }}
            />
          </ProfileAboutSection>
        </ProfileSection>

        {isChanged() && (
          <ProfileEditBottomActionBar>
            <div>
              <span>You have unsaved changes</span>
            </div>
            <div className="buttons">
              <Button $size="md" $variant="secondary" onClick={reset}>
                Reset
              </Button>
              <Button $size="md" onClick={save}>
                Save
              </Button>
            </div>
          </ProfileEditBottomActionBar>
        )}
      </SettingPage>
    </>
  );
};

export default SettingsProfilePage;
