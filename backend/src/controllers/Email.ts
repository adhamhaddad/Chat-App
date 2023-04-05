import { Request, Response } from 'express';
import Email from '../models/Email';

const email = new Email();

export const createEmail = async (req: Request, res: Response) => {
  try {
    const response = await email.createEmail(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Email created successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
export const getEmails = async (req: Request, res: Response) => {
  try {
    const response = await email.getEmails(req.params.id);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Email fetched successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
export const updateEmail = async (req: Request, res: Response) => {
  try {
    const response = await email.updateEmail(req.params.id, req.body);
    res.status(203).json({
      status: true,
      data: { ...response },
      message: 'Email updated successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
export const deleteEmail = async (req: Request, res: Response) => {
  try {
    const response = await email.deleteEmail(req.body);
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'Email deleted successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
