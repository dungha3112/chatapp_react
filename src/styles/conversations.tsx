import styled from "styled-components";

const WIDTH_SIDE_BAR = 280;

export const ConversationSidebarStyle = styled.aside`
  position: absolute;
  top: 0;
  left: 0;

  height: 100%;
  width: ${WIDTH_SIDE_BAR}px;
  /* background-color: #131313; */
  border-right: 1px solid #5454543d;
  & header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #151515;
    height: 80px;
    padding: 0 18px;
    border-bottom: 1px solid #5454543d;

    & h1 {
      font-weight: 500;
    }
  }
`;

export const ConversationChanelPageStyle = styled.div`
  height: 100%;
  margin-left: ${WIDTH_SIDE_BAR}px;
`;
