import { IconType } from 'react-icons';

export type User = {
  handle: string;
  name: string;
  email: string;
  _id: string;
  description: string;
  image: string;
  links: string;
};

export type UserHandle = Pick<
  User,
  'handle' | 'description' | 'image' | 'name' | 'links'
>;

export type RegisterForm = Pick<User, 'name' | 'handle' | 'email'> & {
  password: string;
  confirmPassword: string;
};

export type LoginForm = Pick<User, 'email'> & {
  password: string;
};

export type ProfileForm = Pick<User, 'handle' | 'description'>;

export type NavigationTab = {
  name: string;
  href: string;
  icon: IconType;
};

export type SocialNetwork = {
  id: number;
  name: string;
  url: string;
  enabled: boolean;
};

export type SelectedSocialNetwork = Pick<
  SocialNetwork,
  'name' | 'url' | 'enabled'
>;
