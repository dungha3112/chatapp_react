import styled, { css } from "styled-components";
import { ConversationSelectedProps } from "./styleTypes";
import { WIDTH_SIDE_BAR } from "../utils/constants";

export const ConversationSidebarStyle = styled.aside`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: ${WIDTH_SIDE_BAR}px;
  width: 100%;
  background-color: #111;
  user-select: none;
`;

export const ConversationHeaderSidebarStyle = styled.header`
  height: 80px;
  padding: 10px 32px;
  border-bottom: 1px solid #48484857;
  display: flex;
  gap: 20px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  box-shadow: 0px 0px 10px -5px #000;
`;

export const ConversationSearchbar = styled.input`
  background-color: #202020;
  padding: 10px 15px;
  border: none;
  outline: none;
  font-family: "Inter";
  border-radius: 8px;
  color: #e1e1e1;
  width: 100%;
  font-size: 14px;
  &::placeholder {
    font-size: 12px;
  }
`;

export const ConversationTabStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px 0;
  background-color: #0f0f0f;
`;

export const ConversationTabItemStyle = styled.div<ConversationSelectedProps>`
  padding: 12px 28px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  transition: 0.3s ease;
  border: 1px solid #5454543d;
  font-weight: bold;
  background-color: #1f1f1f;

  ${(props) =>
    props.$selected &&
    css`
      background-color: #383838;
    `}
  &:hover {
    background-color: #383838;
  }
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
