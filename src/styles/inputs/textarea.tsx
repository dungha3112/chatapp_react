import styled from "styled-components";

export const MessageTextarea = styled.textarea`
  background-color: initial;
  outline: none;
  border: none;
  font-family: "Inter";
  font-size: 14px;
  width: 100%;
  outline: none;
  border: none;
  color: #454545;
  resize: none;
  display: flex;
  align-items: center;
  height: 20px;
  max-height: 100px;
  &::-webkit-scrollbar {
    display: none;
  }

  &::placeholder {
    user-select: none;
  }
`;
