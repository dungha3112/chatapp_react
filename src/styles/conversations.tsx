import styled from "styled-components";

const WIDTH_SIDE_BAR = 280;

export const ConversationSidebarStyle = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${WIDTH_SIDE_BAR}px;
  background-color: #1a1a1a;
  border-right: 1px solid #5454543d;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #151515;
    border-radius: 10px;
  }
`;

export const ConversationHeaderSidebar = styled.header`
  width: ${WIDTH_SIDE_BAR}px;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #151515;
  height: 80px;
  padding: 0 18px;
  border-bottom: 1px solid #5454543d;
  border-right: 1px solid #5454543d;

  & h1 {
    font-weight: 500;
  }
`;

export const ConversationSidebarContainer = styled.div`
  margin-top: 81px;
`;

export const ConversationSidebarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border-bottom: 1px solid #5454543d;
  cursor: pointer;

  &.actived {
    background-color: #151515;
  }
`;

export const ConversationChanelPageStyle = styled.div`
  height: 100%;
  width: 100%;
  margin-left: ${WIDTH_SIDE_BAR}px;
`;
