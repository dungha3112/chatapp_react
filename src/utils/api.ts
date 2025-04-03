import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {
  AddGroupRecipientParams,
  AddGroupRecipientResponse,
  ConversationType,
  CreateConversationParams,
  CreateGroupParams,
  CreateUserParams,
  DeleteConversationMessageParams,
  DeleteGroupMessageParams,
  DeleteGroupMessageResponse,
  DeleteMessageResponse,
  EditGroupMessageParams,
  EditMessageParams,
  FetchGroupMessagePayload,
  FetchMessagePayload,
  FriendRequestAcceptResponse,
  FriendRequestType,
  FriendType,
  GroupMessageType,
  GroupType,
  MessageType,
  ProfileType,
  RemoveGroupUserParams,
  SelectedConversationType,
  UpdateGroupOwnerParams,
  UserCredentialsParams,
  UserLeaveGroupParams,
  UserType,
} from "./types";

const BASEURL = import.meta.env.VITE_APP_KEY_URL;

const axiosClient = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
} as AxiosRequestConfig);

const logErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    throw error.response?.data.message;
  } else {
    console.log(error);
  }
};

/**
 * Auth api
 * @param data
 * @returns
 */

export const postRegisterApi = async (data: CreateUserParams) => {
  try {
    return await axiosClient.post("auth/register", data);
  } catch (error) {
    logErrorMessage(error);
  }
};

export const postLoginApi = async (data: UserCredentialsParams) => {
  try {
    return await axiosClient.post("auth/login", data);
  } catch (error) {
    logErrorMessage(error);
  }
};

export const logoutUserApi = async () => {
  try {
    return await axiosClient.post("auth/logout");
  } catch (error) {
    logErrorMessage(error);
  }
};

/**
 * User Api
 * @returns
 */
export const getStatusApi = async () => {
  try {
    return await axiosClient.get<UserType>("auth/status");
  } catch (error) {
    logErrorMessage(error);
  }
};

/**
 * CONVERSATION API
 * @returns
 */
export const getConversationsApi = async () => {
  try {
    return await axiosClient.get<ConversationType[]>("conversations");
  } catch (error) {
    logErrorMessage(error);
  }
};

export const postNewConversationApi = async (
  data: CreateConversationParams
) => {
  try {
    return await axiosClient.post<ConversationType>(`conversations`, data);
  } catch (error) {
    logErrorMessage(error);
  }
};

export const getConversationByIdApi = async (id: number) => {
  try {
    return await axiosClient.get<ConversationType>(`conversations/${id} `);
  } catch (error) {
    logErrorMessage(error);
  }
};

/**
 * MESSAGE API
 * @param id
 * @returns
 */

export const postNewMessageApi = async (
  id: string,
  type: SelectedConversationType,
  data: FormData
) => {
  try {
    const url =
      type === "private"
        ? `conversations/${id}/messages`
        : `groups/${id}/messages`;

    return axiosClient.post(url, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    logErrorMessage(error);
  }
};

/**
 * ConversatioN API
 */

export const checkConversationOrCreate = async (recipientId: number) => {
  try {
    return await axiosClient.get<ConversationType>(
      `exists/conversations/${recipientId}`
    );
  } catch (error) {
    logErrorMessage(error);
  }
};

export const getMessagesByidApi = async (id: number) => {
  try {
    return await axiosClient.get<FetchMessagePayload>(
      `conversations/${id}/messages`
    );
  } catch (error) {
    logErrorMessage(error);
  }
};

export const deleteMessageApi = async ({
  id,
  messageId,
}: DeleteConversationMessageParams) => {
  try {
    return await axiosClient.delete<DeleteMessageResponse>(
      `conversations/${id}/messages/${messageId}`
    );
  } catch (error) {
    logErrorMessage(error);
  }
};

export const editMessageApi = async ({
  id,
  messageId,
  content,
}: EditMessageParams) => {
  try {
    return await axiosClient.patch<MessageType>(
      `conversations/${id}/messages/${messageId}`,
      { content }
    );
  } catch (error) {
    logErrorMessage(error);
  }
};

/**
 * search user api
 */

export const searchUsersApi = async (query: string) => {
  try {
    return await axiosClient.get<UserType[]>(`users/search?query=${query}`);
  } catch (error) {
    logErrorMessage(error);
  }
};

export const checkUsernameApi = async (username: string) => {
  try {
    return await axiosClient.post(`users/check?username=${username}`);
  } catch (error) {
    logErrorMessage(error);
  }
};

/**
 * GROUP API
 * @returns
 */

export const getGroupsApi = async () => {
  try {
    return await axiosClient.get<GroupType[]>("groups");
  } catch (error) {
    logErrorMessage(error);
  }
};

export const createGroupsApi = async (params: CreateGroupParams) => {
  try {
    return await axiosClient.post<GroupType>("groups", params);
  } catch (error) {
    logErrorMessage(error);
  }
};

export const getGroupByIdApi = async (id: number) => {
  try {
    return await axiosClient.get<GroupType>(`groups/${id} `);
  } catch (error) {
    logErrorMessage(error);
  }
};

/**
 * Group message
 * @param id
 * @returns
 */

export const fetchGroupMessagesApi = async (id: number) => {
  try {
    return await axiosClient.get<FetchGroupMessagePayload>(
      `groups/${id}/messages`
    );
  } catch (error) {
    logErrorMessage(error);
  }
};

export const deleteGroupMessageApi = async ({
  id,
  messageId,
}: DeleteGroupMessageParams) => {
  try {
    return await axiosClient.delete<DeleteGroupMessageResponse>(
      `groups/${id}/messages/${messageId}`
    );
  } catch (error) {
    logErrorMessage(error);
  }
};

export const editGroupMessageApi = async ({
  id,
  messageId,
  content,
}: EditGroupMessageParams) => {
  try {
    return await axiosClient.patch<GroupMessageType>(
      `groups/${id}/messages/${messageId}`,
      { content }
    );
  } catch (error) {
    logErrorMessage(error);
  }
};

export const addGroupRecipientApi = async ({
  id,
  username,
}: AddGroupRecipientParams) => {
  try {
    return await axiosClient.post<AddGroupRecipientResponse>(
      `groups/${id}/recipients`,
      {
        username,
      }
    );
  } catch (error) {
    logErrorMessage(error);
  }
};

export const removeGroupUserApi = async ({
  id,
  removeUserId,
}: RemoveGroupUserParams) => {
  try {
    return await axiosClient.delete<GroupType>(
      `groups/${id}/recipients/${removeUserId}`
    );
  } catch (error) {
    logErrorMessage(error);
  }
};

export const updateGroupOwnerApi = async ({
  id,
  newOwnerId,
}: UpdateGroupOwnerParams) => {
  try {
    return await axiosClient.patch<GroupType>(`groups/${id}/owner`, {
      newOwnerId,
    });
  } catch (error) {
    logErrorMessage(error);
  }
};

export const userLeaveGroupApi = async ({ id }: UserLeaveGroupParams) => {
  try {
    return await axiosClient.delete<GroupType>(`groups/${id}/leave`);
  } catch (error) {
    logErrorMessage(error);
  }
};

export const getFriendsApi = async () => {
  try {
    return await axiosClient.get<FriendType[]>(`friends`);
  } catch (error) {
    logErrorMessage(error);
  }
};

export const getFriendsRequestsApi = async () => {
  try {
    return await axiosClient.get<FriendRequestType[]>(`friends/requests`);
  } catch (error) {
    logErrorMessage(error);
  }
};

export const getFriendRejectedRequestsApi = async () => {
  try {
    return await axiosClient.get<FriendRequestType[]>(
      `/friends/requests/reject`
    );
  } catch (error) {
    logErrorMessage(error);
  }
};

export const createFriendRequestApi = async (username: string) => {
  try {
    return await axiosClient.post<FriendRequestType>(`friends/requests`, {
      username,
    });
  } catch (error) {
    logErrorMessage(error);
  }
};

export const acceptFriendRequestApi = async (id: number) => {
  try {
    return await axiosClient.patch<FriendRequestAcceptResponse>(
      `friends/requests/${id}/accept`
    );
  } catch (error) {
    logErrorMessage(error);
  }
};

export const cancelFriendRequestApi = async (id: number) => {
  try {
    return await axiosClient.delete<FriendRequestType>(
      `friends/requests/${id}/cancel`
    );
  } catch (error) {
    logErrorMessage(error);
  }
};

export const rejectFriendRequestApi = async (id: number) => {
  try {
    return await axiosClient.patch<FriendRequestType>(
      `friends/requests/${id}/reject`
    );
  } catch (error) {
    logErrorMessage(error);
  }
};

export const deleteFriendApi = async (id: number) => {
  try {
    return await axiosClient.delete<FriendType>(`friends/${id}/delete`);
  } catch (error) {
    logErrorMessage(error);
  }
};

/**
 * Profile
 */

export const updateUserProfileApi = async (data: FormData) => {
  try {
    return await axiosClient.patch<UserType>(`users/profiles`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    logErrorMessage(error);
  }
};

export const getUserProfileApi = async (id: number) => {
  try {
    return await axiosClient.get<ProfileType>(`users/profiles/${id}`);
  } catch (error) {
    logErrorMessage(error);
  }
};
