import { ControllersList } from '../controllers/contollers.index.js';

class ApiSignInActions {
  public async signInAsAdminAndGetToken() {
    let resp = await ControllersList.signIn.login({ data: { username: 'aqacourse@gmail.com', password: 'password' } });
    return resp.data.token;
  }
}

export default new ApiSignInActions();
