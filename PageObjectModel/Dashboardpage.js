class Dashboardpage {
  constructor(page) {
    this.page = page;
    this.product = page.locator('.card');
    this.cart = page.locator('nav').getByRole('button', { name: /cart/i });
  }

  async addTheProductToCart(productname) {
    const productCard = this.product.filter({ hasText: productname }).first();
    await productCard.getByRole('button', { name: /add to cart/i }).click();
  }

  async clickOnCartButton() {
    await this.cart.waitFor({ state: 'visible' });
    await this.cart.click();
  }
}

module.exports = { Dashboardpage };