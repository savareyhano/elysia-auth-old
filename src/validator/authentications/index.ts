import {
  postAuthenticationLoginPayloadSchema,
  postAuthenticationRefreshTokenPayloadSchema,
} from './schema';

const authenticationsValidator = {
  postAuthenticationLoginPayloadSchema,
  postAuthenticationRefreshTokenPayloadSchema,
};

export default authenticationsValidator;
