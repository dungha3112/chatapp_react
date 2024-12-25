export type PageProps = Partial<{
  $display: string;
  $justifyContent: string;
  $alignItems: string;
}>;

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

export type MessageItemContentProps = Partial<{
  $padding: string;
}>;
