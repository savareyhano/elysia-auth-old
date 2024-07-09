import { t } from 'elysia';

const postUserRegisterPayloadSchema = t.Object({
  username: t.String(),
  password: t.String(),
});

export { postUserRegisterPayloadSchema };
