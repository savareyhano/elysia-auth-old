import { Elysia } from 'elysia';

const route = (handler: any, validator: any) =>
  new Elysia({ prefix: '/authentications' })
    .post('/login', handler.postAuthenticationLoginHandler, {
      body: validator.postAuthenticationLoginPayloadSchema,
    })
    .post('/refresh-token', handler.postAuthenticationRefreshTokenHandler, {
      body: validator.postAuthenticationRefreshTokenPayloadSchema,
    });

export default route;
