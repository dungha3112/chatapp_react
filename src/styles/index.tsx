import styled from "styled-components";
import { InputContainerProps, PageProps } from "./styleTypes";
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
