import prisma from '@/prisma';
import { Request, Response } from 'express';
import { object, string } from 'yup';
import { genarateToken } from '@/common/helper/jwt.helper';
import { compare, hash } from '@/common/helper/bcrypt.helper';
import dayjs from 'dayjs';

export const signinUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(400).json({
        message: `user with email ${email} not found`,
      });
    }
    const isValidUserPassword = compare(password, user.password);

    if (!isValidUserPassword) {
      return res.status(404).json({
        message: `invalid user or password`,
      });
    }
    const token = genarateToken({
      id: user.user_id,
      email: user.email,
      user: user.username,
      role: user.role,
    });
    res.status(200).cookie('api-token', token, {
      secure: false,
      httpOnly: true,
      expires: dayjs().add(7, 'day').toDate(),
    });
    return res.status(200).json({
      code: 200,
      message: 'success',
      data: { user },
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

    const user = await prisma.user.create({
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

export const signOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie('api-token');
    return res.status(200).json({
      code: 200,
      message: 'silahkan kembali',
    });
  } catch (error) {
    console.log(error);
  }
};
