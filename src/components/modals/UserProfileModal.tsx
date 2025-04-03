import { createRef } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ModalContainer, ModalContentBody } from ".";
import { AppDispatch, RootState } from "../../store";
import { handleUserProfileModal } from "../../store/friends/friendsSlice";
import { ButtonIconStyle, ModalHeaderStyle, OverlayStyle } from "../../styles";
import { useKeydown } from "../../utils/hooks";
import { ContextMenuEventType } from "../../utils/types";
import {
  ProfileAboutSection,
  ProfileAboutSectionHeader,
  ProfileDescriptionField,
  ProfileSection,
  SettingPage,
  SettingsProfileBanner,
  SettingsProfileUserDetails,
  UserAvatarContainer,
} from "../../styles/settings";

import bannerDefault from "../../assets/test_banner.jpg";
import avatarDefault from "../../assets/default_avatar.jpg";

const UserProfileModal = () => {
  const ref = createRef<HTMLDivElement>();
  const { userProfile } = useSelector((state: RootState) => state.friends);

  const dispatch = useDispatch<AppDispatch>();

  const handleOverlayClick = (e: ContextMenuEventType) => {
    const { current } = ref;
    if (current === e.target) {
      handleCloseUserProfileModal();
    }
  };

  const handleCloseUserProfileModal = () => {
    dispatch(
      handleUserProfileModal({ openModalUserProfile: false, userProfile: null })
    );
  };

  const handleKeydown = (e: KeyboardEvent) =>
    e.key === "Escape" && handleCloseUserProfileModal();

  useKeydown(handleKeydown);

  const avatarString: string = userProfile?.avatar?.secure_url
    ? userProfile?.avatar?.secure_url
    : avatarDefault;
  const bannerString: string = userProfile?.banner?.secure_url
    ? userProfile?.banner?.secure_url
    : bannerDefault;

  return (
    <OverlayStyle ref={ref} onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeaderStyle>
          <h2>User Profile</h2>

          <ButtonIconStyle onClick={() => handleCloseUserProfileModal()}>
            <MdClose size={20} color="red" />
          </ButtonIconStyle>
        </ModalHeaderStyle>

        <ModalContentBody>
          <div style={{ padding: "20px" }}>
            <SettingPage>
              <SettingsProfileBanner
                $backgroundUrl={bannerString}
                $isChange={false}
              />

              <ProfileSection>
                <SettingsProfileUserDetails>
                  <UserAvatarContainer $url={avatarString} $isChange={false} />
                </SettingsProfileUserDetails>
              </ProfileSection>

              <ProfileAboutSection>
                <ProfileAboutSectionHeader>
                  <label htmlFor="about">About Me</label>
                </ProfileAboutSectionHeader>

                <ProfileDescriptionField
                  value={userProfile?.about}
                  disabled={true}
                />
              </ProfileAboutSection>
            </SettingPage>
          </div>
        </ModalContentBody>
      </ModalContainer>
    </OverlayStyle>
  );
};

export default UserProfileModal;
