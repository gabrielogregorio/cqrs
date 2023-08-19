import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { HttpCode } from '../../config/constants/httpCode';

type validateSchemaResponse = (req: Request, response: Response, next: NextFunction) => void;

export const validateSchema =
  (schema: Joi.ObjectSchema<any>): validateSchemaResponse =>
  (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(HttpCode.BAD_REQUEST).json({ error: 'InvalidPayload', message: error.details[0].message });
    }

    return next();
  };
