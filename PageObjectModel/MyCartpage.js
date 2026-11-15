class MyCartPage {
  constructor(page) {
     this.page = page;
     this.checkout = page.getByRole('button', { name: /checkout/i });
  }

  async clickOnCheckout() {
     await this.checkout.waitFor({ state: 'visible' });
     await this.checkout.click();
  }
}

module.exports = { MyCartPage };