import { Elysia } from 'elysia';
import UsersHandler from './handler';
import route from './routes';

const users = (usersService: any, validator: any) =>
  new Elysia().use(route(new UsersHandler(usersService), validator));

export default users;
