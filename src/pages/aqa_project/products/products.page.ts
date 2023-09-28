import { PageHandler } from "../page.handler";

class ProductsPage extends PageHandler {
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

  get ["Products table body"]() {
    return "#contentInner > table > tbody";
  }

  get [""]() {
    return "";
  }

  get [""]() {
    return "";
  }

  get [""]() {
    return "";
  }

  get [""]() {
    return "";
  }

  get [""]() {
    return "";
  }

  get [""]() {
    return "";
  }
}