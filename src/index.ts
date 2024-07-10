import { Elysia } from 'elysia';
import { jwt } from '@elysiajs/jwt';

// libs
import prisma from './libs/prisma';
import tokenManager from './libs/token-manager';

// services
import UsersService from './services/users-service';
import AuthenticationsService from './services/authentications-service';

// validator
import usersValidator from './validator/users';
import authenticationsValidator from './validator/authentications';

// api
import users from './api/users';
import authentications from './api/authentications';

const app = new Elysia()
  .use(
    jwt({
      name: 'accessJwt',
      secret: process.env.ACCESS_JWT_SECRET as string,
      exp: process.env.ACCESS_JWT_EXP as string,
    })
  )
  .use(
    jwt({
      name: 'refreshJwt',
      secret: process.env.REFRESH_JWT_SECRET as string,
      exp: process.env.REFRESH_JWT_EXP as string,
    })
  )
  .derive(async ({ headers: { authorization }, accessJwt }: any) => {
    if (authorization) {
      const token = authorization.split(' ')[1];
      const verifiedToken = await accessJwt.verify(token);

      return {
        userId: verifiedToken.userId,
      };
    }
  })
  .get(
    '/protected',
    ({ userId }) => {
      return {
        userId,
      };
    },
    {
      async beforeHandle({ headers: { authorization }, set, accessJwt }) {
        if (!authorization) {
          set.status = 400;
          set.headers[
            'WWW-Authenticate'
          ] = `Bearer realm='sign', error="invalid_request"`;

          return 'Unauthorized';
        }

        const bearer = authorization.split(' ')[1];

        if (!bearer) {
          set.status = 400;
          set.headers[
            'WWW-Authenticate'
          ] = `Bearer realm='sign', error="invalid_request"`;

          return 'Unauthorized';
        }

        const verifiedBearer = await accessJwt.verify(bearer);

        if (!verifiedBearer) {
          set.status = 400;
          set.headers[
            'WWW-Authenticate'
          ] = `Bearer realm='sign', error="invalid_request"`;

          return 'Unauthorized';
        }
      },
    }
  )
  .group('/api', (app) =>
    app
      .use(users(new UsersService(prisma), usersValidator))
      .use(
        authentications(
          new AuthenticationsService(),
          new UsersService(prisma),
          tokenManager,
          authenticationsValidator
        )
      )
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
