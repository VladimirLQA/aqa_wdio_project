import SignInPage from "../../pages/aqa_project/sign-in.page";
import {URLS} from "../../endpoints";
import {TIMEOUT_5} from "../../utils/aqa_project_const";
import HomePage from "../../pages/aqa_project/home.page";
import {isBgDanger} from "../../utils/helpers";

/*
* Разработать тест со следующими шагами:
 - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
 - Войти в приложения используя учетные данные aqacourse@gmail.com / password при этом:
 - проверить исчезновение спиннера с помощью waitFor* методов
 - проверить действительно ли пользователь с логином AQA User вошел в систему
 - Прокликать каждый элемент бокового меню, убедится что после клика background-color элемента не красный*/


describe("First test in aqa_project", () => {
    before("Prepare to test", async () => {
        await browser.maximizeWindow();
        await browser.url(URLS.baseAK);
        await SignInPage["Image"].waitForDisplayed({
            TIMEOUT_5, timeoutMsg: `Home page not opened after 5 seconds`,
        });
    });

    it("Should hide spinner", async () => {
        await SignInPage.login();
        await SignInPage["Spinner"].waitForDisplayed({
            TIMEOUT_5, timeoutMsg: `Spinner is not hidden after 5 seconds`, reverse: true,
        });
    });

    it("Should verify that 'AQA User' is logged", async () => {
        const userName = await HomePage["User dropdown"].getText();
        expect(userName).toBe("AQA User");
    });

    it("Should have blue 'background-color' on 'Orders page' button after clicking", async () => {
        await HomePage["Orders page"].click();
        await browser.pause(3000)
        console.log(await isBgDanger(await HomePage["Orders page"]))
        // expect(await isBgDanger(await HomePage["Orders page"])).toBeTruthy();
    });

    // TODO: implement expects after bg change
    it("Should have blue 'background-color' on 'Products page' button after clicking", async () => {
        await HomePage["Products page"].click();
        await browser.pause(3000)
        console.log(await isBgDanger(await HomePage["Products page"]))
    });

    it("Should have blue 'background-color' on 'Customers page' button after clicking", async () => {
        await HomePage["Customers page"].click();
        await browser.pause(3000)
        console.log(await isBgDanger(await HomePage["Customers page"]))
    });
    xit("", () => {

    });
})
