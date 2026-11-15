const { test, expect } = require('@playwright/test');
const { POmanager } = require('../PageObjectModel/POmanager');

const loginData = require('../utils/LoginpageTestData.json');
const personalInfoData = require('../utils/PersonalInformationTestData.json');

test('End to End functionality', async ({ page }) => {
  const pom = new POmanager(page);
  const loginPage = pom.getLoginpage();
  const dashboardPage = pom.getDashBoardPage();//
  const myCartPage = pom.getMyCartPage();
  const paymentMethod = pom.getPaymentMethod();
  const orderConfirmationPage = pom.getOrderConfirmationPage();

  await test.step('Login to the application', async () => {
    await loginPage.launchUrl();
    await loginPage.validLogin(loginData.username, loginData.password);
  });

  await test.step('Add product to cart', async () => {
    await dashboardPage.addTheProductToCart(loginData.Product);
    await dashboardPage.clickOnCartButton();
  });

  await test.step('Checkout the selected product', async () => {
    await expect(page.locator('.cartSection h3')).toHaveText(loginData.Product);
    await myCartPage.clickOnCheckout();
  });

  await test.step('Fill payment and shipping details', async () => {
    await paymentMethod.personalInformation(
      personalInfoData.creditcardnumber,
      personalInfoData.expiryM,
      personalInfoData.expiryD,
      personalInfoData.nameofcard,
    );

    await expect(page.locator('.details__user label')).toHaveText(loginData.username);
    await paymentMethod.shippingInformation(personalInfoData.country, personalInfoData.Countryname);
  });

  await test.step('Confirm the order', async () => {
    await expect(page.getByRole('heading', { name: /Thankyou for the order\./i })).toContainText('Thankyou for the order.');
  });

  await test.step('Verify order in the order history', async () => {
    const orderId = await orderConfirmationPage.getOrderId();
    await orderConfirmationPage.clickOnOrderBtn();
    await orderConfirmationPage.orderScreen(orderId);

    await expect(page.locator('.tagline')).toContainText('Thank you for Shopping With Us');
    const verifyId = await orderConfirmationPage.verifyOrderId();
    expect(verifyId).toBe(orderId);
  });
});

