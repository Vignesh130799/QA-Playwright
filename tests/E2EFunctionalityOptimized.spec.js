const { test, expect } = require('@playwright/test');
const { POmanager } = require('../PageObjectModel/POmanager');

const loginData = require('../utils/LoginpageTestData.json');
const personalInfoData = require('../utils/PersonalInformationTestData.json');

test.describe('E-commerce purchase flow', () => {
  test('End to End functionality optimized', async ({ page }) => {
    const pom = new POmanager(page);
    const loginPage = pom.getLoginpage();
    const dashboardPage = pom.getDashBoardPage();
    const myCartPage = pom.getMyCartPage();
    const paymentMethod = pom.getPaymentMethod();
    const orderConfirmationPage = pom.getOrderConfirmationPage();

    const productName = loginData.Product;

    await test.step('Open login page and sign in', async () => {
      await loginPage.launchUrl();
      await expect(page).toHaveURL(/\/auth\/login$/);
      await loginPage.validLogin(loginData.username, loginData.password);
      await expect(page).toHaveURL(/\/dashboard/);
    });

    await test.step('Add the product to cart', async () => {
      await dashboardPage.addTheProductToCart(productName);
      await dashboardPage.clickOnCartButton();
      await expect(page.locator('.cartSection h3')).toHaveText(productName);
    });

    await test.step('Proceed to checkout', async () => {
      await myCartPage.clickOnCheckout();
    });

    await test.step('Complete payment and shipping details', async () => {
      await paymentMethod.personalInformation(
        personalInfoData.creditcardnumber,
        personalInfoData.expiryM,
        personalInfoData.expiryD,
        personalInfoData.nameofcard,
      );

      await expect(page.locator('.details__user label')).toContainText(loginData.username);
      await paymentMethod.shippingInformation(personalInfoData.country, personalInfoData.Countryname);
    });

    await test.step('Confirm the placed order', async () => {
      await expect(page.getByRole('heading', { name: /Thankyou for the order\./i })).toContainText('Thankyou for the order.');
    });

    await test.step('Verify the order in history', async () => {
      const orderId = await orderConfirmationPage.getOrderId();
      await orderConfirmationPage.clickOnOrderBtn();
      await orderConfirmationPage.orderScreen(orderId);
      await expect(page.locator('.tagline')).toContainText('Thank you for Shopping With Us');

      const actualOrderId = await orderConfirmationPage.verifyOrderId();
      expect(actualOrderId).toContain(orderId);
    });
  });
});
