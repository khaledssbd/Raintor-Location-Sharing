import { User } from '@/types/user';

export const getUsers = async (take: number, skip: number): Promise<User[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/GetUsersList?take=${take}&skip=${skip}`
  );

  // if (!res.ok) {
  //   throw new Error('Failed to fetch users');
  // }

  const result = await res.json();

  return result.users;
};
