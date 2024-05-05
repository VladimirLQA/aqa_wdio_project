import { ControllersList } from '../controllers/contollers.index.js';
import { UsersToken } from '../../utils/storages/index-storages.js';
import { envConfig } from '../../wdio-configuration/env.config.js';

class ApiSignInActions {
  public async signInAsAdminAndGetToken() {
    let resp = await ControllersList.signIn.login({
      data: {
        username: envConfig.ADMIN_EMAIL,
        password: envConfig.ADMIN_PASSWORD,
      },
    });
    UsersToken.setUser(envConfig.ADMIN_EMAIL!, resp.data.token);
    return resp.data.token;
  }
}

export default new ApiSignInActions();
