import axios, { AxiosError, AxiosRequestConfig } from "axios";
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
  try {
    return await axiosClient.post("auth/register", data);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data.message;
    } else {
      console.log(error);
    }
  }
};

export const postLoginApi = async (data: UserCredentialsParams) => {
  try {
    return await axiosClient.post("auth/login", data);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data.message;
    } else {
      console.log(error);
    }
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
    if (error instanceof AxiosError) {
      throw error.response?.data.message;
    } else {
      console.log(error);
    }
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
    if (error instanceof AxiosError) {
      throw error.response?.data.message;
    } else {
      console.log(error);
    }
  }
};

export const postNewConversationApi = async (
  data: CreateConversationParams
) => {
  try {
    return await axiosClient.post<ConversationType>(`conversations/`, data);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data.message;
    } else {
      console.log(error);
    }
  }
};

/**
 * MESSAGE API
 * @param id
 * @returns
 */

export const postNewConversationMessageApi = async (
  content: string,
  id: number
) => {
  try {
    return await axiosClient.post(`conversations/${id}/messages`, { content });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data.message;
    } else {
      console.log(error);
    }
  }
};

export const getMessagesByConversationIdApi = async (id: number) => {
  try {
    return await axiosClient.get<FetchMessagePayload>(
      `conversations/${id}/messages`
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data.message;
    } else {
      console.log(error);
    }
  }
};

export const deleteMessageApi = async ({
  conversationId,
  messageId,
}: DeleteConversationMessageParams) => {
  try {
    return await axiosClient.delete<DeleteMessageResponse>(
      `conversations/${conversationId}/messages/${messageId}`
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data.message;
    } else {
      console.log(error);
    }
  }
};

export const editMessageApi = async ({
  conversationId,
  messageId,
  content,
}: EditMessageParams) => {
  try {
    return await axiosClient.patch<MessageType>(
      `/conversations/${conversationId}/messages/${messageId}`,
      { content }
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data.message;
    } else {
      console.log(error);
    }
  }
};

/**
 * search user api
 */

export const searchUsersApi = async (query: string) => {
  try {
    return await axiosClient.get<UserType[]>(`/users/search?query=${query}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data.message;
    } else {
      console.log(error);
    }
  }
};

/**
 * GROUP API
 * @returns
 */

export const getGroupsApi = async () => {
  try {
    return await axiosClient.get<GroupType[]>("/groups");
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data.message;
    } else {
      console.log(error);
    }
  }
};

export const createGroupsApi = async (params: CreateGroupParams) => {
  try {
    return await axiosClient.post<GroupType>("/groups", params);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data.message;
    } else {
      console.log(error);
    }
  }
};

export const fetchGroupMessagesApi = async (id: number) => {
  try {
    return await axiosClient.get<FetchGroupMessagePayload>(
      `/groups/${id}/messages`
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data.message;
    } else {
      console.log(error);
    }
  }
};

export const postNewGroupMessageApi = async (content: string, id: number) => {
  try {
    return await axiosClient.post(`/groups/${id}/messages`, { content });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data.message;
    } else {
      console.log(error);
    }
  }
};

export const deleteGroupMessageApi = async ({
  groupId,
  messageId,
}: DeleteGroupMessageParams) => {
  try {
    return await axiosClient.delete<DeleteGroupMessageResponse>(
      `/groups/${groupId}/messages/${messageId}`
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data.message;
    } else {
      console.log(error);
    }
  }
};

export const editGroupMessageApi = async ({
  groupId,
  messageId,
  content,
}: EditGroupMessageParams) => {
  try {
    return await axiosClient.patch<GroupMessageType>(
      `/groups/${groupId}/messages/${messageId}`,
      { content }
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data.message;
    } else {
      console.log(error);
    }
  }
};
