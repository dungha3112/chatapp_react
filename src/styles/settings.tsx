import { css, styled } from "styled-components";
import { WIDTH_SIDE_BAR } from "../utils/constants";
import { SettingsSidebarItemProps, UserBannerProps } from "./styleTypes";
import { slideUp } from "./keyframes";

export const SettingsSidebarStyle = styled.aside`
  display: flex;
  flex-direction: column;
  height: 100%;
  /* width: ${WIDTH_SIDE_BAR}px; */
  width: 200px;

  background-color: #111111;
`;

export const SettingPage = styled.div`
  height: 100%;
  width: 100%;
  background-color: #1a1a1a;
  overflow-y: auto;
`;

export const SettingsSidebarHeader = styled.header`
  width: 100%;
  padding: 30px;
  font-weight: 500;
  & span {
    font-size: 20px;
  }
`;

export const SettingsSidebarItemContainer = styled.div``;

export const SettingsSidebarItemStyle = styled.div<SettingsSidebarItemProps>`
  padding: 10px 24px;
  cursor: pointer;
  & .settingItem {
    display: flex;
    align-items: center;
    gap: 10px;
    user-select: none;
    padding: 14px;
    border-radius: 8px;
    background-color: ${({ $isActive }) => $isActive && "#070707"};
    & span {
      font-weight: 500;
    }
  }
`;

export const SettingsProfileBanner = styled.div<UserBannerProps>`
  width: 100%;
  height: 310px;
  cursor: pointer;
  ${({ $backgroundUrl }) =>
    $backgroundUrl
      ? css`
          transition: 1s background ease;
          background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
            url("${$backgroundUrl}") no-repeat center;
          opacity: 70%;
          transition: 300ms opacity ease;
          background-size: cover;
          &:hover {
            opacity: 100%;
          }
        `
      : css`
          background-color: #404040;
        `}

  ${({ $isChange }) =>
    $isChange &&
    css`
      &::before {
        background-color: none;
        content: "Change Banner";
        /* width: 100px; */
        height: 310px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #b5b5b5;
        font-size: 20px;
        font-weight: 500;
        opacity: 0;
        transition: 300ms opacity ease;
      }
      &:hover:before {
        opacity: 1;
      }
    `}
`;

export const ProfileSection = styled.div`
  padding: 0 36px;
`;

export const SettingsProfileUserDetails = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  transform: translateY(-50%);
  & span {
    font-size: 24px;
    font-weight: 500;
    position: absolute;
    bottom: 20px;
    left: 190px;
  }
`;

export const UserAvatarContainer = styled.div<{
  $url?: string;
  $isChange: boolean;
}>`
  height: 140px;
  width: 140px;
  border-radius: 100%;
  border: 4px solid #afafaf;
  cursor: pointer;
  ${({ $url }) =>
    $url
      ? css`
          transition: 1s background ease;
          background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
            url("${$url}") no-repeat center;
          background-size: cover;
          opacity: 100%;
          transition: 300ms opacity ease;
          &:hover {
            opacity: 100%;
          }
        `
      : css`
          background-color: #404040;
        `};

  ${({ $isChange }) =>
    $isChange &&
    css`
      &::before {
        height: 140px;
        width: 140px;
        content: "Change";
        position: absolute;
        border-radius: 50%;
        /* width: 100%;
        height: 100%; */
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #b5b5b5;
        font-size: 20px;
        font-weight: 500;
        background: rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition: 300ms opacity ease;
      }

      &:hover::before {
        opacity: 1;
      }
    `}
`;

export const ProfileAboutSection = styled.div`
  background-color: #111111;
  padding: 32px;
  box-sizing: border-box;
  border-radius: 8px;

  position: relative;
  transform: translateY(-20%);
`;

export const ProfileAboutSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & label {
    font-size: 20px;
    font-weight: 500;
  }
`;

export const ProfileDescriptionField = styled.textarea`
  background-color: inherit;
  outline: none;
  border: none;
  color: #ffffff;
  font-family: "Inter";
  font-size: 15px;
  font-weight: 500;
  width: 100%;
  padding: 0;
  margin-top: 20px;
  resize: none;
  height: 50px;
  /* max-height: 80px; */

  flex: 0 0 auto;
  &::-webkit-scrollbar {
    display: none;
  }

  &:disabled {
    color: #484848;
  }
`;

export const ProfileEditBottomActionBar = styled.div`
  background-color: #0e0e0e;
  width: 550px;
  max-width: 100%;
  display: flex;
  padding: 14px 24px;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  position: fixed;
  overflow: hidden;
  bottom: 0;
  left: 50%;
  right: 50%;
  transform: translate(-50%, 100%);
  animation: 500ms ${slideUp} ease;
  animation-fill-mode: forwards;
  border-radius: 8px;
  & .buttons {
    display: flex;
    gap: 10px;
  }
`;
