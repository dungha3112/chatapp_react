import axios, { AxiosRequestConfig } from "axios";
import {
  CreateConversationParams,
  ConversationType,
  CreateUserParams,
  FetchMessagePayload,
  UserCredentialsParams,
  UserType,
  DeleteConversationMessageParams,
  DeleteMessageResponse,
  EditMessageParams,
  MessageType,
  GroupType,
  FetchGroupMessagePayload,
  CreateGroupParams,
  DeleteGroupMessageParams,
  DeleteGroupMessageResponse,
  EditGroupMessageParams,
  GroupMessageType,
} from "./types";

const BASEURL = import.meta.env.VITE_APP_KEY_URL;

const axiosClient = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
} as AxiosRequestConfig);

/**
 * Auth api
 * @param data
 * @returns
 */
export const postRegisterApi = async (data: CreateUserParams) => {
  return await axiosClient.post("auth/register", data);
};

export const postLoginApi = async (data: UserCredentialsParams) => {
  return await axiosClient.post("auth/login", data);
};

/**
 * User Api
 * @returns
 */
export const getStatusApi = async () =>
  await axiosClient.get<UserType>("auth/status");

/**
 * CONVERSATION API
 * @returns
 */
export const getConversationsApi = async () =>
  await axiosClient.get<ConversationType[]>("conversations");

export const postNewConversationApi = async (
  data: CreateConversationParams
) => {
  const res = await axiosClient.post<ConversationType>(`conversations/`, data);
  return res;
};

/**
 * MESSAGE API
 * @param id
 * @returns
 */

export const postNewConversationMessageApi = async (
  content: string,
  id: number
) => await axiosClient.post(`conversations/${id}/messages`, { content });

export const getMessagesByConversationIdApi = async (id: number) =>
  await axiosClient.get<FetchMessagePayload>(`conversations/${id}/messages`);

export const deleteMessageApi = async ({
  conversationId,
  messageId,
}: DeleteConversationMessageParams) => {
  const res = await axiosClient.delete<DeleteMessageResponse>(
    `conversations/${conversationId}/messages/${messageId}`
  );
  return res;
};

export const editMessageApi = async ({
  conversationId,
  messageId,
  content,
}: EditMessageParams) =>
  await axiosClient.patch<MessageType>(
    `/conversations/${conversationId}/messages/${messageId}`,
    { content }
  );

/**
 * search user api
 */

export const searchUsersApi = async (query: string) =>
  await axiosClient.get<UserType[]>(`/users/search?query=${query}`);

/**
 * GROUP API
 * @returns
 */

export const getGroupsApi = async () =>
  await axiosClient.get<GroupType[]>("/groups");

export const createGroupsApi = async (params: CreateGroupParams) =>
  await axiosClient.post<GroupType>("/groups", params);

export const fetchGroupMessagesApi = async (id: number) =>
  await axiosClient.get<FetchGroupMessagePayload>(`/groups/${id}/messages`);

export const postNewGroupMessageApi = async (content: string, id: number) =>
  await axiosClient.post(`/groups/${id}/messages`, { content });

export const deleteGroupMessageApi = async ({
  groupId,
  messageId,
}: DeleteGroupMessageParams) =>
  await axiosClient.delete<DeleteGroupMessageResponse>(
    `/groups/${groupId}/messages/${messageId}`
  );

export const editGroupMessageApi = async ({
  groupId,
  messageId,
  content,
}: EditGroupMessageParams) =>
  await axiosClient.patch<GroupMessageType>(
    `/groups/${groupId}/messages/${messageId}`,
    { content }
  );
