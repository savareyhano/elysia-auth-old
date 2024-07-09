import { Elysia } from 'elysia';

const route = (handler: any, validator: any) =>
  new Elysia({ prefix: '/users' }).post(
    '/register',
    handler.postUserRegisterHandler,
    {
      body: validator.postUserRegisterPayloadSchema,
    }
  );

export default route;
