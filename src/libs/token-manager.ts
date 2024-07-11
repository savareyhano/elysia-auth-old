import InvariantError from '../exceptions/invariant-error';

const tokenManager = {
  generateAccessToken: async (accessJwt: any, payload: any) =>
    await accessJwt.sign(payload),
  generateRefreshToken: async (refreshJwt: any, payload: any) =>
    await refreshJwt.sign(payload),
  verifyRefreshToken: async (refreshJwt: any, token: any) => {
    const verifiedToken = await refreshJwt.verify(token);

    if (!verifiedToken) {
      throw new InvariantError('refresh token is invalid.');
    }

    return verifiedToken;
  },
};

export default tokenManager;
