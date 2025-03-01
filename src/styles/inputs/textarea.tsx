import styled from "styled-components";

export const MessageTextarea = styled.textarea`
  background-color: inherit;
  outline: none;
  border: none;
  font-family: "Inter";
  font-size: 14px;
  width: 100%;
  outline: none;
  border: none;
  color: #454545;
  padding: 10px 15px;
  margin: 4px 0;
  resize: none;
  /* height: 20px;
  max-height: 200px; */
  flex: 0 0 auto;
  &::-webkit-scrollbar {
    display: none;
  }

  &::placeholder {
    user-select: none;
  }
`;
