export class BaseEndpoints {
  readonly baseURL = 'https://aqa-course-project.app/';
}

class SignInEndpoints extends BaseEndpoints {
  readonly login = `api/login/`;
}

export default new SignInEndpoints();
