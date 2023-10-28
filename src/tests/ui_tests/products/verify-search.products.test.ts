import SignInActions from '../../../ui/actions/sign-in.actions';
import HomeActions from '../../../ui/actions/home.actions';
import ProductsActions from '../../../ui/actions/products/products.actions';
import { ProductsStorage } from '../../../utils/storages/products.storage';
import ProductsController from '../../../api/controllers/products.controller';
import { reqAsLoggedUser } from '../../../api/request/request-as-logged-user';
import FiltersProductModalActions from '../../../ui/actions/products/modals/filters-product-modal.actions';
import { MANUFACTURERS } from '../../../data/products/product.data';
import CommonActions from '../../../ui/actions/common.actions';
import FiltersModalPage from '../../../ui/pages/aqa_project/products/modals/filters-product-modal.page';
import ProductsPage from '../../../ui/pages/aqa_project/products/products.page';
import { loadModule } from '@wdio/mocha-framework/build/common';
import { browserPause } from '../../../utils/helpers';

describe('', () => {
  before('', async () => {
    await SignInActions.openSalesPortal();
    await SignInActions.signIn();
    await HomeActions.openProductsPage();
  });

  after('', async () => {
    for (const product of ProductsStorage.getAllProducts()) {
      await reqAsLoggedUser(ProductsController.delete, { data: { name: product.name } });
    }
  });

  context('WDIO - 7', () => {
    it('Should verify table data after search with filters', async () => {
      await ProductsActions.clickOnFiltersButton();
      await CommonActions.checkFiltersBox(FiltersModalPage, [MANUFACTURERS.APPLE, MANUFACTURERS.AMAZON, MANUFACTURERS.XIAOMI]);
      await FiltersProductModalActions.clickOnApplyButton();
      await CommonActions.verifyTableData(ProductsPage)






      // const parsedProductsUI = await ProductsActions.getParsedTableData();
      // const sorted = sortByNameASC(parsedProductsUI);
      // const productsAPI = await reqAsLoggedUser(ProductsController.get, {});
      // const a = await ProductsActions.getParsedAPIData<Pick<IProduct, 'name' | 'manufacturer' | 'price'>>(productsAPI.data.Products, MANUFACTURERS.APPLE);
      // expect(sorted).toEqual(a);
    });
  });
});
