import ClientError from '../../exceptions/client-error';

class UsersHandler {
  _usersService: any;
  constructor(usersService: any) {
    this._usersService = usersService;

    this.postUserRegisterHandler = this.postUserRegisterHandler.bind(this);
  }

  async postUserRegisterHandler({ body, set }: any) {
    try {
      const { username, password } = body;

      await this._usersService.verifyNewUsername(username);

      const user = await this._usersService.addUser(username, password);

      set.status = 201;
      return {
        status: 'success',
        message: 'user registered successfully.',
        data: {
          id: user.id,
          username: user.username,
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

export default UsersHandler;
