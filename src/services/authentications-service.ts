import AuthenticationError from '../exceptions/authentication-error';

class AuthenticationsService {
  constructor() {}

  async verifyPassword(password: string, hashedPassword: string) {
    const verifiedPassword = await Bun.password.verify(password, hashedPassword);

    if (!verifiedPassword) {
      throw new AuthenticationError('wrong password.');
    }
  }
}

export default AuthenticationsService;
