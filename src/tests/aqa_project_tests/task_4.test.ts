import SignInPage from '../../pages/aqa_project/sign-in.page';
import { URLS } from '../../api/endpoints';
import HomePage from '../../pages/aqa_project/home.page';
import { browserPause, isBgDanger } from '../../utils/helpers';
import { TIMEOUT } from '../../utils/aqa_project_const';

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
    await SignInPage.login();
    await $(SignInPage.Spinner).waitForDisplayed({
      timeout: TIMEOUT['5 seconds'],
      timeoutMsg: `Spinner is not hidden after 5 seconds`,
      reverse: true,
    });
  });

  it('Should verify that \'AQA User\' is logged', async () => {
    const userName = await HomePage.waitForElemAndGetText(HomePage['User dropdown menu']);
    expect(userName).toBe('AQA User');
  });

  it('Should have blue \'background-color\' on \'Orders\' sidebar button after clicking', async () => {
    await HomePage.waitForElemAndClick(HomePage['Orders page']);
    await browserPause(500);
    isBgColorRead = await isBgDanger(await $(HomePage['Orders page']));
    expect(isBgColorRead).toBe(false);
  });

  it('Should have blue \'background-color\' on \'Products\' sidebar button after clicking', async () => {
    await HomePage['Products page'];
    await browserPause(500);
    isBgColorRead = await isBgDanger(await $(HomePage['Products page']));
    expect(isBgColorRead).toBe(false);
  });

  it('Should have blue \'background-color\' on \'Customers\' sidebar button after clicking', async () => {
    await HomePage.waitForElemAndClick(HomePage['Customers page']);
    await browserPause(500);
    isBgColorRead = await isBgDanger(await $(HomePage['Customers page']));
    expect(isBgColorRead).toBe(false);
  });
});
