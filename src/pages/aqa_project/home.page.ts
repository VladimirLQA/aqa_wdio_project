import { PageHandler } from "./page-handler.page";
import { BasePage } from "./base.page";

class HomePage extends BasePage {
  get ["Orders view details button"]() {
    return "#orders-from-home";
  }

  get ["Products view details button"]() {
    return "#products-from-home";
  }

  get ["Customers view details button"]() {
    return "#customers-from-home";
  }
}

export default new HomePage();
