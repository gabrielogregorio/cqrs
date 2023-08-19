import { Request, Response } from 'express';
import { EmailAlreadyExists } from '@/domain/errors/EmailAlreadyExistsError';
import { UserEventRepository } from '@/infrastructure/database/postgres/repositories/UserEventRepository';
import { Logger } from '@/shared/logging/Logger';
import { HttpCode } from '../../config/constants/httpCode';
import { UserService } from '../../application/services/UserService';

const userService = new UserService(new UserEventRepository());

export const createUserController = async (req: Request, res: Response) => {
  const user = req.body;

  try {
    await userService.createUser(user);
    res.status(HttpCode.CREATED).send('User created');
  } catch (error) {
    if (error instanceof EmailAlreadyExists) {
      res.status(HttpCode.CONFLICT).send({
        error: 'Conflict',
        message: 'The email address is already registered.',
      });
      return;
    }
    Logger.info(error);
    res.status(HttpCode.INTERNAL_ERROR).send('Failed to create user');
  }
};
