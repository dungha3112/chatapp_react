import styled, { css } from "styled-components";

export const InputContainer = styled.div`
  background-color: #131313;
  padding: 12px 16px;
  border-radius: 10px;
  width: 100%;
`;

export const InputField = styled.input`
  font-family: "Inter";
  background: inherit;
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
  font-size: 14px;
  font-weight: bold;
  color: #8f8f8f;
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

export const Page = styled.div`
  height: 100%;
  background-color: #1a1a1a;
  display: flex;
  justify-content: center;
  align-items: center;
`;
