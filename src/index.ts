import { Elysia } from 'elysia';

import prisma from './libs/prisma';

import UsersService from './services/users-service';

import usersValidator from './validator/users';

import users from './api/users';

const app = new Elysia()
  .group('/api', (app) => app
    .use(users(new UsersService(prisma), usersValidator))
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
