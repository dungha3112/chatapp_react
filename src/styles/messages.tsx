import styled, { css } from "styled-components";
import { MessageItemContentProps } from "./styleTypes";

export const MessagePanelStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #141414;
`;

export const MessagePanelHeaderStyle = styled.div`
  height: 80px;
  padding: 10px 32px;
  box-sizing: border-box;
  width: 100%;
  flex-shrink: 0;
  border-bottom: 1px solid #49494925;
  box-shadow: 5px 0 5px 1px #000;
  background-color: #151515;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MessagePanelBody = styled.div`
  padding: 32px 32px 0 32px;
  box-sizing: border-box;
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;
  /* height: calc(100% - 600px); */
`;

export const MessageContainerStyle = styled.div`
  height: 100%;
  box-sizing: border-box;
  padding: 10px 0;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #101010;
    border-radius: 10px;
  }
`;

export const MessagePanelFooter = styled.div`
  position: relative;
  padding: 0 32px 10px 32px;
  margin-top: 0;
`;

export const MessageTypingStatusStyle = styled.div`
  width: fit-content;
  height: 20px;
  font-size: 13px;
  font-style: italic;
  color: #555555;
  position: absolute;
  z-index: 999;
  margin-left: 24px;
`;

export const MessageInputContainer = styled.div`
  background-color: #101010;
  border-radius: 10px;
  position: relative;
  width: 100%;
  display: flex;
  padding: 18px 12px;
  gap: 15px;
  align-items: end;
`;

export const MessageInputStyle = styled.input`
  background-color: inherit;
  outline: none;
  border: none;
  font-family: "Inter";
  font-size: 14px;
  width: 100%;
  outline: none;
  border: none;
  color: #454545;
  padding: 14px 0px;
  margin: 4px 0;

  &::placeholder {
    user-select: none;
  }
`;

export const MessageItemContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 5px 0;
  word-break: break-word;
`;

export const MessageItemAvatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #c1c1c1;
`;

export const MessageItemDetails = styled.div``;

export const MessageItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  .authorName {
    font-size: 16px;
    font-weight: bold;
  }
  .time {
    font-size: 11.5px;
    color: #6d6d6d;
  }
`;

export const MessageItemContent = styled.div<MessageItemContentProps>`
  ${({ $padding }) => css`
    padding: ${$padding};
  `}
  white-space: pre-wrap;
  width: 100%;
`;

export const EditMessageActionsContainer = styled.div`
  font-size: 12px;
  & span {
    color: #1d77ff;
  }
`;

type CharacterLimitProps = {
  $atMaxLength: boolean;
};
export const CharacterLimit = styled.span<CharacterLimitProps>`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 9px;
  margin: 5px;
  font-weight: 500;
  color: ${({ $atMaxLength }) => ($atMaxLength ? "#ff0000" : "#9c9c9c")};
  transition: 0.5s color ease;
`;
