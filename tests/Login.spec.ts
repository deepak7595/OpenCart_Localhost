

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { TestConfig } from '../test.config';

let config: TestConfig;
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;

test.beforeEach(async ({ page }) => {
  config = new TestConfig(); 
  await page.goto(config.appUrl); 

  homePage = new HomePage(page);
  loginPage = new LoginPage(page);
  myAccountPage = new MyAccountPage(page);
});

test.afterEach(async ({ page }) => {
  await page.close(); 
});


test('User login test @master @sanity @regression',async()=>{


    await homePage.clickMyAccount();
    await homePage.clickLogin();

    await loginPage.setEmail(config.email);
    await loginPage.setPassword(config.password);
    await loginPage.clickLogin();

  
    const isLoggedIn=await myAccountPage.isMyAccountPageExists();
    expect(isLoggedIn).toBeTruthy();

})
