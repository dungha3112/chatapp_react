import styled from "styled-components";

export const MessagePanelStyle = styled.div`
  background: inherit;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const MessagePanelHeaderStyle = styled.div`
  height: 80px;
  padding: 10px 32px;
  box-sizing: border-box;
  width: 100%;
  flex-shrink: 0;
  border-bottom: 1px solid #49494925;
  background-color: #151515;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

export const MessagePanelBody = styled.div`
  padding: 32px 10px 0 32px;
  padding-top: 0;
  box-sizing: border-box;
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;
  height: calc(100% - 600px);
`;

export const MessagePanelFooter = styled.div`
  padding: 0 32px 10px 32px;
  margin-top: 0;
`;

export const MessageTypingStatusStyle = styled.div`
  width: 100%;
  margin-top: 10px;
  height: 20px;
  font-size: 13px;
  font-style: italic;
  color: #555555;
`;

export const MessageInputContainer = styled.div`
  background-color: #101010;
  border-radius: 10px;
  position: relative;
  width: 100%;
`;

export const MessageInputStyle = styled.input`
  background-color: inherit;
  outline: none;
  border: none;
  font-family: "Inter";
  font-size: 18px;
  width: 100%;
  outline: none;
  border: none;
  color: #454545;
  padding: 18px 24px;
  margin: 4px 0;
`;

export const MessageItemContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  word-break: break-word;
`;

export const MessageItemAvatar = styled.div`
  width: 50px;
  height: 50px;
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

export const MessageItemContent = styled.div``;
