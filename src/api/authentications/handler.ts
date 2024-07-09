import ClientError from '../../exceptions/client-error';

class AuthenticationsHandler {
  _authenticationsService: any;
  _usersService: any;
  constructor(authenticationsService: any, usersService: any) {
    this._authenticationsService = authenticationsService;
    this._usersService = usersService;

    this.postAuthenticationLoginHandler =
      this.postAuthenticationLoginHandler.bind(this);
  }

  async postAuthenticationLoginHandler({ body, accessJwt, refreshJwt, set }: any) {
    try {
      const { username, password } = body;

      const user = await this._usersService.verifyUser(username);

      await this._authenticationsService.verifyPassword(
        password,
        user.password
      );

      set.status = 201;
      return {
        status: 'success',
        message: 'logged in successfully',
        data: {
          accessToken: await accessJwt.sign({
            userId: user.id,
          }),
          refreshToken: await refreshJwt.sign({
            userId: user.id,
          }),
        },
      };
    } catch (error: any) {
      if (error instanceof ClientError) {
        set.status = error.statusCode;
        return {
          status: 'fail',
          message: error.message,
        };
      }

      // Server ERROR!
      set.status = 500;
      return {
        status: 'error',
        message: 'sorry, there was a problem on our server.',
      };
    }
  }
}

export default AuthenticationsHandler;
