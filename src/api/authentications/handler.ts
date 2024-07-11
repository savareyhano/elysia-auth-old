import ClientError from '../../exceptions/client-error';

class AuthenticationsHandler {
  _authenticationsService: any;
  _usersService: any;
  _tokenManager: any;
  constructor(
    authenticationsService: any,
    usersService: any,
    tokenManager: any
  ) {
    this._authenticationsService = authenticationsService;
    this._usersService = usersService;
    this._tokenManager = tokenManager;

    this.postAuthenticationLoginHandler =
      this.postAuthenticationLoginHandler.bind(this);
    this.postAuthenticationRefreshTokenHandler =
      this.postAuthenticationRefreshTokenHandler.bind(this);
  }

  async postAuthenticationLoginHandler({
    body,
    accessJwt,
    refreshJwt,
    set,
  }: any) {
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
          accessToken: await this._tokenManager.generateAccessToken(accessJwt, {
            userId: user.id,
          }),
          refreshToken: await this._tokenManager.generateRefreshToken(
            refreshJwt,
            {
              userId: user.id,
            }
          ),
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

  async postAuthenticationRefreshTokenHandler({
    body,
    accessJwt,
    refreshJwt,
    set,
  }: any) {
    try {
      const { refreshToken } = body;

      const verifiedRefreshToken = await this._tokenManager.verifyRefreshToken(
        refreshJwt,
        refreshToken
      );

      set.status = 201;
      return {
        status: 'success',
        message: 'logged in successfully',
        data: {
          accessToken: await this._tokenManager.generateAccessToken(
            accessJwt,
            verifiedRefreshToken
          ),
          refreshToken: await this._tokenManager.generateRefreshToken(
            refreshJwt,
            verifiedRefreshToken
          ),
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
