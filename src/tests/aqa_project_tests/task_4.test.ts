import SignInPage from '../../pages/aqa_project/sign-in.page';
import { URLS } from '../../api/endpoints';
import HomePage from '../../pages/aqa_project/home.page';
import { browserPause, isAttributeContainClass } from '../../utils/helpers';
import { TIMEOUT } from '../../utils/aqa_project_const';
import SignInActions from '../../actions/sign-in.actions';
import SidebarPage from '../../pages/aqa_project/sidebar.page';

/*
* Разработать тест со следующими шагами:
 - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
 - Войти в приложения используя учетные данные aqacourse@gmail.com / password при этом:
 - проверить исчезновение спиннера с помощью waitFor* методов
 - проверить действительно ли пользователь с логином AQA User вошел в систему
 - Прокликать каждый элемент бокового меню, убедится что после клика background-color элемента не красный */

describe('First test in aqa_project', () => {
  let isBgColorRead: boolean;
  before('Prepare to test', async () => {
    await browser.maximizeWindow();
    await browser.url(URLS.baseAK);
    await $(SignInPage.Image).waitForDisplayed({
      timeout: TIMEOUT['5 seconds'],
      timeoutMsg: `Home page not opened after 5 seconds`,
    });
  });

  it('Should hide spinner after login', async () => {
    await SignInActions.signIn();
    await $(SignInPage.Spinner).waitForDisplayed({
      timeout: TIMEOUT['5 seconds'],
      timeoutMsg: `Spinner is not hidden after 5 seconds`,
      reverse: true,
    });
  });

  it('Should verify that \'AQA User\' is logged', async () => {
    const userName = await SidebarPage.waitForElemAndGetText(SidebarPage['User dropdown menu']);
    expect(userName).toBe('AQA User');
  });

  it('Should have blue \'background-color\' on \'Orders\' sidebar button after clicking', async () => {
    await SidebarPage.waitForElemAndClick(SidebarPage['Orders page']);
    await browserPause(500);
    isBgColorRead = await isAttributeContainClass(SidebarPage['Orders page'], 'bg-danger');
    expect(isBgColorRead).toBe(false);
  });

  it('Should have blue \'background-color\' on \'Products\' sidebar button after clicking', async () => {
    await SidebarPage.waitForElemAndClick(SidebarPage['Products page']);
    await browserPause(500);
    isBgColorRead = await isAttributeContainClass(SidebarPage['Products page'], 'bg-danger');
    expect(isBgColorRead).toBe(false);
  });

  it('Should have blue \'background-color\' on \'Customers\' sidebar button after clicking', async () => {
    await SidebarPage.waitForElemAndClick(SidebarPage['Customers page']);
    await browserPause(500);
    isBgColorRead = await isAttributeContainClass(SidebarPage['Customers page'], 'bg-danger');
    expect(isBgColorRead).toBe(false);
  });
});
