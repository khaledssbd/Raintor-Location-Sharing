export interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  university: string;
  avatar?: string;
  company: {
    name: string;
    title: string;
  };
}
