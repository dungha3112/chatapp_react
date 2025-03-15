import { css } from "styled-components";

export type PageProps = Partial<{
  $display: string;
  $justifyContent: string;
  $alignItems: string;
}>;

export type Size = "sm" | "md" | "lg";
export type Variant = "primary" | "secondary";

export type ButtonProps = Partial<{
  $size: Size;
  $variant: Variant;
  $flex: boolean;
}>;

export const getButtonSizeStyle = (size: Size) => {
  switch (size) {
    case "sm":
      return css`
        padding: 10px 20px;
        font-size: 14px;
      `;

    case "md":
      return css`
        padding: 12px 24px;
        font-size: 16px;
      `;

    case "lg":
      return css`
        padding: 14px 26px;
        font-size: 18px;
      `;

    default:
      return css`
        width: 100%;
        padding: 14px 26px;
        font-size: 18px;
      `;
  }
};

export const getButtonVariantStyle = (variant: Variant) => {
  switch (variant) {
    case "secondary":
      return css`
        color: #fff;
        background-color: #2b00ff;
      `;

    default:
      return css`
        background-color: #2b00ff;
        color: #fff;

        &:hover {
          cursor: pointer;
          background-color: #3415ff;
        }

        &:active {
          background-color: #3a1cff;
        }

        &:disabled {
          background-color: #4937dc7c;
          color: #878787;
          cursor: not-allowed;
        }
      `;
  }
};

export type InputContainerProps = Partial<{
  $backgroundColor: string;
}>;

export type ContextMenuProps = Partial<{
  $top: number;
  $left: number;
}>;

export type ConversationSelectedProps = Partial<{
  $selected: boolean;
}>;

export type ConversationSidebarItemProps = Partial<{
  $selected: boolean;
}>;

export type MessageItemContentProps = Partial<{
  $padding: string;
}>;

export type SidebarItemProps = Partial<{
  $active: boolean;
}>;

export type AnimationOceanWavesProps = Partial<{
  $animation?: boolean;
  $length?: number;
}>;

export type ShowSidebarProps = Partial<{
  $showSidebar: boolean;
}>;

export type FriendNavbarItemProps = Partial<{
  $active: boolean;
}>;
