import { Request, Response, Router } from 'express';
import { createUserController } from '../controllers/UserController';
import { userSchema } from '../validation/UserSchema';
import { validateSchema } from '../middlewares/validateSchema';
import { getUserQuery } from '../../application/queries/getUserQuery';
import { HttpCode } from '../../config/constants/httpCode';

export const userRouter: Router = Router();

userRouter.post('/user', validateSchema(userSchema), createUserController);

userRouter.get('/users', async (req: Request, res: Response) => {
  const users = await getUserQuery();

  res.status(HttpCode.SUCCESS).json(users);
});
