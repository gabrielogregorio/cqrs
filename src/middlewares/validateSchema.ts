import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { HttpCode } from '../code';

export const validateSchema =
  (schema: Joi.ObjectSchema<any>): ((req: Request, response: Response, next: NextFunction) => void) =>
  (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(HttpCode.BAD_REQUEST).json({ error: 'InvalidPayload', message: error.details[0].message });
    }
    return next();
  };
