import styled, { css } from "styled-components";
import { ConversationSelectedProps } from "./styleTypes";
import { WIDTH_SIDE_BAR } from "../utils/constants";

export const ConversationSidebarStyle = styled.aside`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${WIDTH_SIDE_BAR}px;
  background-color: #111;
`;

export const ConversationHeaderSidebarStyle = styled.header`
  padding: 10px 32px;
  border-bottom: 1px solid #48484857;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export const ConversationSidebarContainerStyle = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ConversationSidebarItemStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border-bottom: 1px solid #5454543d;
  cursor: pointer;
  transition: 0.3s ease;

  &.actived {
    background-color: #151515;
  }

  &:hover {
    background-color: #151515;
  }
`;

/**
 * ConversationSelected
 */

export const ConversationSelectedStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 20px 0;
  background-color: #0f0f0f;
  border-bottom: 1px solid #5454543d;
`;

export const ConversationSelectedItem = styled.div<ConversationSelectedProps>`
  padding: 12px 28px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  transition: 0.3s ease;
  border: 1px solid #5454543d;
  font-weight: bold;
  background-color: #212121;
  ${(props) =>
    props.$selected &&
    css`
      background-color: #414141;
      color: #292929;
    `}
  &:hover {
    background-color: #414141;
    color: #292929;
  }
`;
