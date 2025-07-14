export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  gender: string;
  university: string;
  image: string;
  company: {
    name: string;
    title: string;
  };
}
