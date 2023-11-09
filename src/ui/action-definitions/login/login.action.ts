import { Given, When, Then } from '@wdio/cucumber-framework';
import signInPage from '../../pages/aqa_project/sign-in.page';
import homePage from '../../pages/aqa_project/home.page';

Given(/^I open Sales Portal/, async function() {
  await browser.url('https://anatoly-karpovich.github.io/aqa-course-project/#');
});

When(/^I enter "([^"]*)" in "Email input"$/, async function(email: string) {
  await signInPage.waitForElemAndSetValue(signInPage['Email input'], email);
});

When(/^I enter "([^"]*)" in "Password input"$/, async function(password: string) {
  await signInPage.waitForElemAndSetValue(signInPage['Password input'], password);
});

When(/^I click on "Login button"$/, async function() {
  await signInPage.waitForElemAndClick(signInPage['Login button']);
});

Then(/^I should be on "Home page"$/, async function() {
  await homePage.waitForElement(homePage['uniqueElement']);
});