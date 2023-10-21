import SignInActions from '../../../ui/actions/sign-in.actions';
import HomeActions from '../../../ui/actions/home.actions';
import ProductsActions from '../../../ui/actions/products/products.actions';
import { ProductsStorage } from '../../../utils/storages/products.storage';
import ProductsController from '../../../api/controllers/products.controller';
import { reqAsLoggedUser } from '../../../api/request/request-as-logged-user';
import FiltersProductModalActions from '../../../ui/actions/products/modals/filters-product-modal.actions';
import { MANUFACTURERS } from '../../../data/products/product.data';
import { IProduct } from '../../../ui/types/products.type';
import { sortByNameASC } from '../../../utils/helpers';

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
      await FiltersProductModalActions.checkFiltersBox([MANUFACTURERS.APPLE]);
      await FiltersProductModalActions.clickOnApplyButton();
      const parsedProductsUI = await ProductsActions.getParsedTableData();
      const sorted = sortByNameASC(parsedProductsUI);
      const productsAPI = await reqAsLoggedUser(ProductsController.get, {});
      const a = await ProductsActions.getParsedAPIData<Pick<IProduct, 'name' | 'manufacturer' | 'price'>>(productsAPI.data.Products, MANUFACTURERS.APPLE);
      expect(sorted).toEqual(a)
    });
  });
});
