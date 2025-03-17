import styled, { css } from "styled-components";
import { FriendNavbarItemProps } from "./styleTypes";

export const FriendsPageStyle = styled.div`
  background-color: #101010;
  height: 100%;
  width: 100%;
`;

export const FriendsNavbarStyle = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  padding: 40px;
  border-bottom: 1px solid #5454543d;
  user-select: none;
  height: 110px;

  & .navLinks {
    display: flex;
    align-items: center;
    gap: 50px;
  }
`;

export const FriendNavbarItem = styled.span<FriendNavbarItemProps>`
  cursor: pointer;
  transition: 0.5s background-color ease;
  padding: 10px;
  border-radius: 5px;
  ${({ $active }) =>
    $active &&
    css`
      text-underline-offset: 6px;
      text-decoration: underline;
    `}

  &:hover {
    background-color: #383838;
  }
`;

export const FriendListContainer = styled.div`
  padding: 40px;
  height: calc(100% - 110px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FriendListItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px;
  cursor: pointer;
  justify-content: space-between;
  user-select: none;
  border-bottom: 1px solid #5454543d;
  transition: 0.4s background-color ease-in-out;

  & .userDetails {
    display: flex;
    align-items: center;
    gap: 10px;

    & .avatar {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      background-color: blue;
    }

    & .nameAndMessage {
      display: flex;
      flex-direction: column;
      gap: 5px;

      & .name {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }

      & .message {
        font-size: 14px;
        font-style: italic;
        font-weight: 500;
        color: #626262;
      }
    }
  }

  & .icon {
    font-size: 22px;
    color: #ff0000;
  }

  &:hover {
    background-color: #262626;
  }
`;

export const FriendRequestItemContainer = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  &:hover {
    background-color: #363535;
  }

  & .user {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  & .avatar {
    height: 50px;
    width: 50px;
    background-color: blue;
    border-radius: 50%;
  }

  & .name {
    display: flex;
    flex-direction: column;
    gap: 5px;

    & .status {
      font-size: 14px;
      font-style: italic;
      font-weight: 500;
      color: #626262;
    }
  }

  & .icons {
    display: flex;
    gap: 10px;
  }
`;
