export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  joinedDate: string;
  description: string;
  avatar: string;
  background: string;
}

export type Avatar = Pick<User, 'id' |'avatar'>;
export type Background = Pick<User, 'id' |'background'>;

 