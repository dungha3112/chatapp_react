import styled from "styled-components";

export const MessagePanelStyle = styled.div`
  background: inherit;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const MessageContainerStyle = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 0;
  display: flex;
  flex-direction: column-reverse;
`;

export const MessageInputContainer = styled.div`
  background-color: #101010;
  border-radius: 10px;
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
