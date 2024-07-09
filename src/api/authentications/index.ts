import { Elysia } from 'elysia';
import AuthenticationsHandler from './handler';
import route from './routes';

const authentications = (
  authenticationsService: any,
  usersService: any,
  validator: any
) =>
  new Elysia().use(
    route(
      new AuthenticationsHandler(authenticationsService, usersService),
      validator
    )
  );

export default authentications;
