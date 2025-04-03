import styled, { css } from "styled-components";
import { AvatarProps, getAvatarSizeStyle, Size } from "./styleTypes";

export const UserAvatarContainer = styled.img<AvatarProps>`
  ${({ $size }) => getAvatarSizeStyle($size as Size)}
  border-radius: 50%;

  ${({ $url }) =>
    $url &&
    css`
      background: url("${$url}") no-repeat center;
      background-size: cover;
    `}
`;
