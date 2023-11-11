export const URLS = {
  baseHerokuapp: 'http://the-internet.herokuapp.com/',
  baseURL: 'https://aqa-course-project.app/',
  endpoints: {
    login: `api/login/`,

    products: `api/products/`,
    productByID: (id: string) => `api/products/${id}/`,
  },
};

export class Endpoints {}

export class
