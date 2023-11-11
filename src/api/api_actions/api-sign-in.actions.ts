import SignInController from '../controllers/sign-in.controller';

class ApiSignInActions {
  public async signInAsAdminAndGetToken() {
    let resp = await SignInController.login({ data: { username: "aqacourse@gmail.com", password: "password" } });
    return resp.data.token;
  }
}

export default new ApiSignInActions();