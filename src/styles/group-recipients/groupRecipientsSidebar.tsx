import styled, { css } from "styled-components";
import { WIDTH_SIDE_BAR } from "../../utils/constants";
import { slideInFromLeft, slideInFromRight } from "../keyframes";
import { ShowSidebarProps } from "../styleTypes";

export const GroupRecipientsSidebarStyle = styled.aside<ShowSidebarProps>`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${WIDTH_SIDE_BAR}px;
  flex: 0 0 auto;
  background-color: #111111;
  border-left: 1px solid #49494925;

  /* console.log("Styled Component received $showSidebar:", $showSidebar); */
  /* ${({ $showSidebar }) => {
    const animation = $showSidebar ? slideInFromRight : slideInFromLeft;
    return css`
      animation: ${animation} 500ms ease;
    `;
  }} */
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
  padding: 30px 0 0 0px;
  flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0;
  user-select: none;
  &::-webkit-scrollbar {
    display: none;
  }
  .titleOnOffline {
    display: flex;
    padding: 20px;
    color: #fff;
    text-decoration: underline;
  }
`;

export const GroupRecipientItemSidebarStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border-bottom: 1px solid #5454543d;
  cursor: pointer;
  transition: 0.3s ease;

  &.actived {
    background-color: #363535;
  }

  &:hover {
    background-color: #363535;
  }
`;
