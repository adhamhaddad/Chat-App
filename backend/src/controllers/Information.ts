import { Request, Response } from 'express';
import Information from '../models/Information';

const information = new Information();

export const createInformation = async (req: Request, res: Response) => {
  try {
    const response = await information.createInformation(req.body);
    res.status(201).json({
      status: true,
      data: response,
      message: 'Information created successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
export const getInformation = async (req: Request, res: Response) => {
  try {
    const response = await information.getInformation(req.params.id);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Information fetched successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
export const updateInformation = async (req: Request, res: Response) => {
  try {
    const response = await information.updateInformation(
      req.params.id,
      req.body
    );
    res.status(200).json({
      status: true,
      data: response,
      message: 'Information updated successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
export const deleteInformation = async (req: Request, res: Response) => {
  try {
    const response = await information.deleteInformation(req.params.id);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Information fetched successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
