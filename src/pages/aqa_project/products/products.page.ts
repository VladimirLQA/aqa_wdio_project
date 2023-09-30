import { BasePage } from "../base.page";

class ProductsPage extends BasePage {
  get ["Page header"]() {
    return ".page-header-flex h2";
  }

  get ["Search input"]() {
    return "[type='search']";
  }

  get ["Search button"]() {
    return "#search-products";
  }

  get ["Filter button"]() {
    return "#filter";
  }

  get ["Add product button"]() {
    return "button.page-title-button";
  }

  get ["Table row selector"]() {
    return (product: string) => `//tr[./td[text()="${product}"]]`;
  }

  get ["Name by table row"]() {
    return (productName: string) => `${this["Table row selector"](productName)}/td[1]`;
  }

  get ["Price by table row"]() {
    return (productPrice: string) => `${this["Table row selector"](productPrice)}/td[2]`;
  }

  get ["Manufacturer by table row"]() {
    return (productManufacturer: string) => `${this["Table row selector"](productManufacturer)}/td[3]`;
  }
}

export default new ProductsPage();