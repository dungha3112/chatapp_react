import { ConversationType, UserType } from "./types";

export const getRecipientFromConversation = (
  conversation?: ConversationType,
  user?: UserType
) => {
  return user?.id === conversation?.creator?.id
    ? conversation?.recipient
    : conversation?.creator;
};
