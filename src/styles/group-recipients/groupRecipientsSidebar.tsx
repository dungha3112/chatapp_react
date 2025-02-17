import styled from "styled-components";
import { WIDTH_SIDE_BAR } from "../../utils/constants";

export const GroupRecipientsSidebarStyle = styled.aside`
  display: flex;
  flex-direction: column;
  max-width: ${WIDTH_SIDE_BAR}px;
  width: 100%;
  height: 100%;
  background-color: #141414;
  border-left: 1px solid #49494925;
`;

export const GroupRecipientsSidebarHeaderStyle = styled.div`
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

  & span {
    font-size: 18px;
    font-weight: 500;
  }
`;

export const GroupRecipientsSidebarItemContainerStyle = styled.div`
  user-select: none;

  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const GroupRecipientItemSidebarStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 500;
  padding: 8px 16px;
  cursor: pointer;

  border-bottom: 1px solid #5454543d;
`;
