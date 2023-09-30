import { BaseActions } from "../base.actions";
import ProductsPage from "../../pages/aqa_project/products/products.page";
import { IProduct } from "../../types/products.type";

class ProductsActions extends BaseActions {
  public async openAddNewProductPage() {
    await ProductsPage.waitForElemAndClick(ProductsPage["Add product button"]);
    await this.waitForPageLoad();
  }

  public async getCreatedProducttToVerify(productName: string) {
    return {
      name: await ProductsPage.waitForElemAndGetText(ProductsPage["Name by table row"](productName)),
      price: await ProductsPage.waitForElemAndGetText(ProductsPage["Price by table row"](productName)),
      manufacturer: await ProductsPage.waitForElemAndGetText(ProductsPage["Manufacturer by table row"](productName)),
    };
  }

  public async verifyCreatedProduct(expectedProduct: IProduct) {
    const actualProduct = await this.getCreatedProducttToVerify(expectedProduct.name);
    expect(actualProduct.name).toBe(expectedProduct.name);
    expect(actualProduct.price).toBe(`$${expectedProduct.price}`);
    expect(actualProduct.manufacturer).toBe(expectedProduct.manufacturer);
  }
}

export default new ProductsActions();