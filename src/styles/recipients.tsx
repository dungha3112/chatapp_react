import styled from "styled-components";

export const RecipientResultContainerStyle = styled.div`
  position: absolute;
  background-color: #161616;
  right: 0;
  left: 0;
  margin: 4px 24px;
`;

export const RecipientScrollableItemContainer = styled.div`
  max-height: 200px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const RecipientResultItemStyle = styled.div`
  padding: 20px 10px;
  border: 1px solid #161616;

  transition: 0.5s background-color ease-in-out;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    background-color: #292929;
    border: 1px solid #22222278;
    cursor: pointer;
  }

  &:hover .icon {
    transition: 0.5s color ease-in-out;
    color: #2b00ff;
  }

  & .icon {
    font-size: 22px;
    cursor: pointer;
    color: #656565;
  }
`;

export const SelectedRecipientPillStyle = styled.div`
  margin-top: 10px;
  background-color: #111;
  user-select: none;
  padding: 6px 10px;
  width: fit-content;
  border-radius: 15px;
  & .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
  }

  & .icon {
    font-size: 22px;
    cursor: pointer;
    color: #656565;
    transition: 0.5s color ease-in-out;
    &:hover {
      color: #f90e22;
    }
  }
`;
