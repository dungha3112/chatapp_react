import styled from "styled-components";
import { SidebarItemProps } from "./styleTypes";

export const UserSidebarStyle = styled.div`
  height: 100%;
  background-color: #212121;
  display: flex;
  flex: 0 0 80px;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const UserSidebarHeaderStyle = styled.header`
  height: 90px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  flex-shrink: 0;
  border-bottom: 1px solid #494949a9;
`;

export const ScrollableContainer = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const UserSidebarScrollableContainer = styled(ScrollableContainer)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UserSidebarFooterStyle = styled.footer`
  padding: 18px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const UserSidebarItemStyle = styled.div<SidebarItemProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  background-color: ${({ $active }) => $active && "#bb00ff"};
`;
