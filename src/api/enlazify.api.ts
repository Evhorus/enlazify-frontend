import { isAxiosError } from 'axios';
import api from '../config/axios';
import { User, UserHandle } from '../types';

export const getUser = async () => {
  try {
    const { data } = await api<User>('/user');
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
};

export const updateProfile = async (formData: User) => {
  try {
    const { data } = await api.patch<{ message: string }>('/user', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
};

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const { data } = await api.post<{ image: string }>('/user/image', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
};

export const getUserByHandle = async (handle: string) => {
  try {
    const { data } = await api<UserHandle>(`/${handle}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
};

export const searchByHandle = async (handle: string) => {
  try {
    const { data } = await api.post<{ message: string }>('/search', { handle });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
};
