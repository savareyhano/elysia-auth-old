import { t } from 'elysia';

const postAuthenticationLoginPayloadSchema = t.Object({
  username: t.String(),
  password: t.String(),
});

const postAuthenticationRefreshTokenPayloadSchema = t.Object({
  refreshToken: t.String(),
});

export {
  postAuthenticationLoginPayloadSchema,
  postAuthenticationRefreshTokenPayloadSchema,
};
