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

export const RecipientNoResultContainerStyle = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  margin: 4px 24px;
  background-color: #161616;
  will-change: background-color;
  animation: bgChange 1.5s infinite alternate;
  animation-fill-mode: both;

  @keyframes bgChange {
    0% {
      background-color: #161616;
    }
    100% {
      background-color: #292929;
    }
  }
`;

export const RecipientNoResultItemStyle = styled.div`
  padding: 20px 10px;
  border: 1px solid #161616;

  transition: 0.5s background-color ease-in-out;
  user-select: none;
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: center;
  animation: colorChange 1.5s infinite alternate;
  span {
    color: #656565;
  }
  & .icon {
    font-size: 22px;
    cursor: pointer;
    color: #656565;
    animation: colorChange 1s infinite alternate;
  }
  @keyframes colorChange {
    0% {
      color: #656565;
    }
    100% {
      color: #ffff00;
    }
  }
`;

export const SelectedRecipientPillStyle = styled.div`
  background-color: #111;
  border: 1px solid #ffffff32;
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
    transition: 300ms color ease;
    &:hover {
      color: #c62d2d;
    }
  }
`;

export const RecipientChipContainerStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  border-radius: 10px;
  gap: 4px 10px;

  max-height: 80px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #070707;
    border-radius: 10px;
  }
`;
