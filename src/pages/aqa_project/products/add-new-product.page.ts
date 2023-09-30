import { BasePage } from "../base.page";

class AddNewProductPage extends BasePage {
  get ["Name input"]() {
    return `#inputName`;
  }

  get ["Price input"]() {
    return `#inputPrice`;
  }

  get ["Amount input"]() {
    return `#inputAmount`;
  }

  get ["Notes input"]() {
    return `#textareaNotes`;
  }

  get ["Save New Product button"]() {
    return `#save-new-product`;
  }

  get ["Manufacturer dropdown list"]() {  // maybe unnecessary
    return "#inputManufacturer > option";
  }

  get ["Manufacturer dropdown"]() {
    return "#inputManufacturer";
  }

  get ["Manufacturer dropdown element"]() {
    return (brand: string) => `//option[text()="${brand}"]`;
  }
}

export default new AddNewProductPage();