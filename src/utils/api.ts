import axios, { AxiosRequestConfig } from "axios";
import {
  CreateConversationParams,
  ConversationType,
  CreateUserParams,
  FetchMessagePayload,
  UserCredentialsParams,
  UserType,
  DeleteMessageParams,
  DeleteMessageResponse,
  EditMessageParams,
  MessageType,
  GroupType,
} from "./types";

const BASEURL = import.meta.env.VITE_APP_KEY_URL;

const axiosClient = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
} as AxiosRequestConfig);

export const postRegisterApi = async (data: CreateUserParams) => {
  return await axiosClient.post("auth/register", data);
};

export const postLoginApi = async (data: UserCredentialsParams) => {
  return await axiosClient.post("auth/login", data);
};

export const getStatusApi = async () =>
  await axiosClient.get<UserType>("auth/status");

export const getConversationsApi = async () =>
  await axiosClient.get<ConversationType[]>("conversations");

export const getMessagesByConversationIdApi = async (id: number) =>
  await axiosClient.get<FetchMessagePayload>(`conversations/${id}/messages`);

export const postNewMessageApi = async (content: string, id: number) =>
  await axiosClient.post(`conversations/${id}/messages`, { content });

export const postNewConversationApi = async (
  data: CreateConversationParams
) => {
  const res = await axiosClient.post<ConversationType>(`conversations/`, data);
  return res;
};

export const deleteMessageApi = async ({
  conversationId,
  messageId,
}: DeleteMessageParams) => {
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
    content
  );

export const getGroupsApi = async () =>
  await axiosClient.get<GroupType[]>("/groups");
