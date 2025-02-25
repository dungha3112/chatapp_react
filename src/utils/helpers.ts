import { ConversationType, GroupType, UserType } from "./types";

export const getRecipientFromConversation = (
  conversation?: ConversationType,
  user?: UserType
) => {
  return user?.id === conversation?.creator?.id
    ? conversation?.recipient
    : conversation?.creator;
};

export const isGroupOwner = (user?: UserType, group?: GroupType) =>
  user?.id === group?.owner.id;
