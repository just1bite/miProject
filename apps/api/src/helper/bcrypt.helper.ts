import { hashSync } from 'bcryptjs';

export const hash = (password: string): string => {
  return hashSync(password, 8);
};
