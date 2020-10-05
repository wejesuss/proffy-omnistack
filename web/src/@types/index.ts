/* eslint-disable camelcase */
import {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftBar?: boolean;
  label: string;
  upLabel?: { active: boolean };
  name: string;
  mask?: 'phone' | 'currency';
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  symbol?: React.ReactNode;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  labelExtraInfo?: React.ReactNode;
  options: Array<{
    value: string;
    label: string;
  }>;
}

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
}

export interface ControlContainerProps {
  pageId: string;
  backLink?: string;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  topBarTitle?: string;
}

export interface TeacherProps {
  teacher: Teacher;
}

export interface TrashProps {
  removeScheduleItem: () => void;
}

export interface UserHeaderProps {
  name: string;
  image: string;
}

export interface SuccessProps {
  messageTitle: string;
  message: string;
  buttonText: string;
  buttonLink: string;
}

export interface SuccessStateProps {
  success?: boolean;
  messageTitle: string;
  message: string;
  buttonText: string;
  buttonLink: string;
}

export interface Teacher {
  id: number;
  user_id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    surname: string;
    email: string;
    avatar: string;
    bio: string;
    whatsapp: string;
  };
}

export enum RoutesPath {
  baseURL = 'http://localhost:3333',
  connections = '/connections',
  forgotPswd = '/users/forgot-password',
  login = '/users/login',
  classes = '/classes',
}

export enum Session {
  token = '@Proffy_token',
  remember = '@Proffy_remember',
  user = '@Proffy_user',
}
