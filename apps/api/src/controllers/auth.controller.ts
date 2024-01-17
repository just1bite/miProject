import prisma from '@/prisma';
import { Request, Response } from 'express';
import { object, string } from 'yup';
import { hash } from '@/helper/bcrypt.helper';

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

export const signUpSchema = object({
  body: object({
    username: string()
      .min(6, 'minimun lenght of username is 6')
      .max(15, 'maximun lenght of username is 15')
      .required('username is required'),
    email: string().email().required('email is required'),
    password: string()
      .min(6, 'minimun lenght of password is 6')
      .max(15, 'maximun lenght of password is 15')
      .required('username is required'),
  }),
});
export const signupUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username }: signupPayload = {
      ...req.body,
      password: hash(req.body.password),
    };

    const user = await prisma.users.create({
      data: {
        email,
        password,
        username,
        referral_number: username,
      },
    });
    return res.status(200).json({
      code: 200,
      message: 'success',
      data: user,
    });
  } catch (error: any) {
    console.log('@@@ getBranchById error:', error.message || error);
    return res.status(500).json({
      code: 500,
      messagge: 'Internal Server Error',
    });
  }
};
