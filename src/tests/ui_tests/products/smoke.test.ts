import SignInActions from "../../../actions/sign-in.actions";
import HomeActions from "../../../actions/home.actions";
import ProductsActions from "../../../actions/products/products.actions";
import AddNewProductActions from "../../../actions/products/add-new-product.actions";
import { newProduct, toastText } from "../../../data/products/product.data";
import { BasePage } from "../../../pages/aqa_project/base.page";


describe("", () => {
  before("Prepare to test", async () => {
    await SignInActions.openSitePage();
  });

  // TODO: implement teardown methods after test
  after("", () => {

  })
  it("Should create product with valid data", async () => {
    //login
    await SignInActions.signIn();

    //open products
    await HomeActions.openProductsPage();

    //open add new products
    await ProductsActions.openAddNewProductPage();

    //product creation
    await AddNewProductActions.createProduct(newProduct, newProduct.manufacturer);

    //verify created product
    await ProductsActions.verifyCreatedProduct(newProduct);
    await HomeActions.verifyNotificationText(await toastText("created"));
  });
})