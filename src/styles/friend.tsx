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
  padding: 60px 40px;
  border-bottom: 1px solid #5454543d;
  user-select: none;

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
  height: 100px;
  overflow: auto;

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
  user-select: none;
  border-bottom: 1px solid #5454543d;
  transition: 0.5s background-color ease;
  & .avatar {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: blue;
  }

  &:hover {
    background-color: #383838;
  }
`;

export const FriendRequestItemContainer = styled.div``;
