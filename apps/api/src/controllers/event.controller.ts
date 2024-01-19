// getAllJSDocTagsasd

import { date, number, object, string } from 'yup';

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
