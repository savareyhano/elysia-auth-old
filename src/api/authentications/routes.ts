import { Elysia } from 'elysia';

const route = (handler: any, validator: any) =>
  new Elysia({ prefix: '/authentications' }).post(
    '/login',
    handler.postAuthenticationLoginHandler,
    {
      body: validator.postAuthenticationLoginPayloadSchema,
    }
  );

export default route;
