import { ControllersList } from '../controllers/contollers.index.js';
import { UsersToken } from '../../utils/storages/index-storages.js';

class ApiSignInActions {
  public async signInAsAdminAndGetToken() {
    let resp = await ControllersList.signIn.login({ data: { username: 'aqacourse@gmail.com', password: 'password' } });
    UsersToken.setUser('aqacourse@gmail', resp.data.token);
    return resp.data.token;
  }
}

export default new ApiSignInActions();
