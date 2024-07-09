import { t } from 'elysia';

const postAuthenticationLoginPayloadSchema = t.Object({
  username: t.String(),
  password: t.String(),
});

export { postAuthenticationLoginPayloadSchema };
