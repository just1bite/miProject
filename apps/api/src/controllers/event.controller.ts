import prisma from '@/prisma';
import { Prisma } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { date, number, object, string } from 'yup';
import { verifyToken } from '@/common/helper/jwt.helper';
// import { jwtDecode } from 'jwt-decode';

export interface eventPayload {
  title: string;
  eventDescription: string;
  price: number;
  eventDate: Date;
  eventLocation: string;
  seatCount: number;
}

export const eventPayload = object({
  body: object({
    title: string()
      .min(6, 'minimun lenght of title is 6')
      .max(32, 'maximun lenght of title is 32')
      .required('event title is required'),
    eventDescription: string()
      .min(16, 'minimun lenght of description is 16')
      .max(128, 'maximun length of description is 128')
      .required('description is required'),
    price: number().required('price is required'),
    eventDate: date().required('date is require'),
    eventLocation: string().required('location is require'),
    seatCount: number().required('available seat is require'),
  }),
});

export const createEvent = async (req: Request, res: Response) => {
  try {
    const cookie = req.cookies;
    if (!cookie) {
      return res.status(400).json({
        code: 400,
        message: 'Login required',
      });
    }
    const getUserIdFromToken = (token: string): number | null => {
      try {
        const decodedToken = jwt.verify(token, 'secret') as {
          id: number;
        };

        return decodedToken.id;
      } catch (error) {
        return null;
      }
    };

    const userToken = req.cookies['api-token'];
    const userId = getUserIdFromToken(userToken);

    if (!userId) {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized. Login required.',
      });
    }
    const {
      title,
      eventDescription,
      price,
      eventDate,
      eventLocation,
      seatCount,
    } = req.body;
    if (
      !title ||
      !eventDescription ||
      !price ||
      !eventDate ||
      !eventLocation ||
      !seatCount
    ) {
      res.status(400).json({
        code: 400,
        message: 'Please enter the required fields.',
      });
    }

    const createEvent = await prisma.event.create({
      data: {
        title,
        eventDescription,
        price,
        eventDate,
        eventLocation,
        seatCount,
        userUser_id: userId,
      },
    });

    return res.status(200).json({
      code: 200,
      message: 'Event Created Successfully',
    });
  } catch (error) {
    console.log(error);
  }
};

export const createTicketTier = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const token: string = req.cookies['api-token'];
    const { tierName, discount } = req.body;

    if (!token) {
      return res.status(401).json({
        code: 401,
        message: 'Token not found',
      });
    }
    const verifiedToken = verifyToken(token);
    if (!verifiedToken.isValid) {
      return res.status(401).json({
        code: 401,
        message: 'Invalid token',
      });
    }
    const { id } = verifiedToken.data;
    const userWithId = await prisma.user.findUnique({
      where: {
        user_id: id,
      },
    });
    if (!userWithId) {
      return res.status(401).json({
        code: 401,
        message: 'Invalid user Id',
      });
    }
    if (!eventId) {
      return res.status(401).json({
        code: 401,
        message: `Event id ${eventId} not found`,
      });
    }

    const eventWithId = await prisma.event.findUnique({
      where: {
        id: parseInt(eventId),
      },
    });

    if (!eventWithId) {
      return res.status(401).json({
        code: 401,
        message: `Event id ${eventWithId} not found`,
      });
    }

    const postTicketTier = await prisma.ticketTier.create({
      data: {
        tierName,
        discount,
        eventId: eventWithId.id,
      },
    });

    return res.status(200).json({
      code: 200,
      message: 'Ticket tier successfully created',
      data: postTicketTier,
    });
  } catch (error) {
    console.log(error);
  }
};
