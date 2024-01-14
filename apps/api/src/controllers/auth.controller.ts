import prisma from '@/prisma';
import { Request, Response } from 'express';

export const signinUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    return res.status(200).json({
      code: 200,
      message: 'success',
      data: { email, password },
    });
  } catch (error: any) {
    console.log(error);
  }
};

export interface signupPayload {
  email: string;
  password: string;
  username: string;
}
export const signupUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username }: signupPayload = req.body;
    const user = await prisma.users.create({
      data: { email, password, username, referral_number: username },
    });
    return res.status(200).json({
      code: 200,
      message: 'success',
      data: user,
    });
  } catch (error: any) {
    console.log(error);
  }
};
