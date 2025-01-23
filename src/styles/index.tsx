import styled, { css } from "styled-components";
import { ContextMenuProps, InputContainerProps, PageProps } from "./styleTypes";
import { fadeInUpwards } from "./keyframes";

export const InputContainer = styled.div<InputContainerProps>`
  background-color: ${({ $backgroundColor }) => $backgroundColor || "#131313"};
  padding: 12px 16px;
  border-radius: 10px;
  width: 100%;
`;

export const InputField = styled.input`
  font-family: "Inter";
  background-color: inherit;
  outline: none;
  border: none;
  color: #fff;
  width: 100%;
  font-size: 18px;
  padding: 0;
  margin: 4px 0;
`;

export const InputLabel = styled.label`
  display: block;
  color: #8f8f8f;
  font-size: 14px;
  margin: 4px 0;
  transition: 1s time-out ease-in-out;
`;

export const Button = styled.button`
  color: #fff;
  background-color: #2b00ff;
  width: 100%;
  font-family: "Inter";
  font-size: 14px;
  border-radius: 10px;
  outline: none;
  border: none;
  padding: 20px 0;

  cursor: pointer;
`;

export const Page = styled.div<PageProps>`
  height: 100%;
  background-color: #1a1a1a;
  display: ${({ $display }) => $display};
  justify-content: ${({ $justifyContent }) => $justifyContent};
  align-items: ${({ $alignItems }) => $alignItems};
`;

export const OverlayStyle = styled.div`
  height: 100%;
  width: 100%;
  background-color: #000000e3;
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

type ModalProps = Partial<{
  showModal: boolean;
}>;

export const ModalContainerStyle = styled.div<ModalProps>`
  position: relative;
  background-color: #121212;
  width: 650px;
  box-sizing: border-box;
  border-radius: 10px;
  animation: ${fadeInUpwards} 500ms ease;
`;

export const ModalHeaderStyle = styled.header`
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 28px;
  & h2 {
    font-weight: 500;
    margin: 0;
  }
`;

export const ModalContentBodyStyle = styled.div`
  padding: 24px;
  position: relative;
`;

export const TextField = styled.textarea`
  font-family: "Inter";
  outline: none;
  border: none;
  background-color: inherit;
  color: #fff;
  font-size: 18px;
  width: 100%;
  padding: 0;
  margin: 4px 0;
  resize: none;
`;

export const ContextMenuSyle = styled.div<ContextMenuProps>`
  border-radius: 4px;
  position: absolute;
  width: 200px;
  position: fixed;
  background-color: #252525;
  ${({ $left, $top }) => css`
    top: ${$top}px;
    left: ${$left}px;
  `}
  transition: ease-in-out 0.3s;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 10px;
    border-radius: 5px;
  }
  ul li {
    padding: 10px 12px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 10px;
    &:hover {
      cursor: pointer;
      transition: ease-in-out 0.2s;
      background-color: #000;
    }
  }
`;

export const UserAvatarContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  background-color: #fff000;
`;
