import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { createUserCommand } from './commands/createUserCommand';
import { getUserQuery } from './queries/getUserQuery';
import dataSource from './datasource';
import { EmailAlreadyExists } from './errors/emailAlreadyExists';
import { validateSchema } from './middlewares/validateSchema';
import { userSchema } from './schemas/user';
import { UserEvents } from './entity/userEvents.entity';
import { UserListService } from './query/usersList';
import { Envs } from './envs';
import { HttpCode } from './code/index';
import './events/handleEventsListener';
import eventEmitter from './events/eventEmmiter';

dataSource
  .initialize()
  .then(() => {
    console.log('✅ write database on');
  })
  .catch((err) => {
    console.error('error on start write database', err);
    throw err;
  });

mongoose.set('strictQuery', false);

mongoose
  .connect(Envs.READ_DB_URL_CONNECT, {})
  .then(() => {
    console.log('✅ read database on');
  })
  .catch((error) => {
    console.log('error on start read database', error);
  });

const app = express();

app.use(express.json());
app.use(cors());

app.post('/user', validateSchema(userSchema), async (req: Request, res: Response) => {
  const user = req.body;

  createUserCommand(user)
    .then(() => {
      res.status(HttpCode.CREATED).send('User created');
    })
    .catch((error: unknown) => {
      if (error instanceof EmailAlreadyExists) {
        res.status(HttpCode.CONFLICT).send({
          error: 'Conflict',
          message: 'The email address is already registered.',
        });
        return;
      }
      console.log(error);
      res.status(HttpCode.INTERNAL_ERROR).send('Failed to create user');
    });
});

app.get('/users', async (req: Request, res: Response) => {
  const users = await getUserQuery();

  res.status(HttpCode.SUCCESS).json(users);
});

const processEvents = async () => {
  const events = dataSource.getRepository(UserEvents);
  const eventsItems = await events.find({ where: { synchronized: false } });

  if (eventsItems.length === 0) {
    console.log('no events to process');
    return;
  }

  console.log('starting process events');
  await eventsItems.forEach(async (item) => {
    if (item.synchronized) {
      return;
    }

    console.log(`starting process event ${item.eventType} as id ${item.eventId} as userId ${item.userId}`);

    const { name, email } = JSON.parse(item.payload);

    UserListService.Create({ name, email, id: item.userId });

    await events.update(item.eventId, { synchronized: true });

    eventEmitter.emit('UserCreated', { email, name });
  });
};

setInterval(processEvents, 5000);

app.listen(Envs.APPLICATION_PORT, () => {
  console.log(`Server is running on port ${Envs.APPLICATION_PORT}`);
});
