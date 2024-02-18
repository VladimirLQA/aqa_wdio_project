import { Given, Then, When } from '@wdio/cucumber-framework';
import homePage from '../../pages/aqa_project/home.page.js';
import signInPage from '../../pages/aqa_project/sign-in.page.js';

Given(/^I open Sales Portal$/, async function () {
  // @ts-ignore
  await browser.url('https://anatoly-karpovich.github.io/aqa-course-project/#');
});

When(/^I enter "([^"]*)" in "Email input"$/, async function (email: string) {
  await signInPage.setValue(signInPage['Email input'], email);
});

When(/^I enter "([^"]*)" in "Password input"$/, async function (password: string) {
  await signInPage.setValue(signInPage['Password input'], password);
});

When(/^I click on "Login button"$/, async function () {
  await signInPage.click(signInPage['Login button']);
});

Then(/^I should be on "Home page"$/, async function () {
  await homePage.waitForElement(homePage['uniqueElement']);
});
