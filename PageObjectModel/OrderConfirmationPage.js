class OrderConfirmationPage {
  constructor(page) {
    this.page = page;
    this.orderbtn = page.getByRole('button', { name: /orders/i });
    this.orderid = page.getByRole('cell').filter({ hasText: /\|\s*[a-f0-9]{24}\s*\|/i });
    this.orderscreen = page.locator('tbody tr');
    this.verifyorderid = page.locator('.col-text');
  }

  async getOrderId() {
    const orderText = await this.orderid.first().textContent();
    const orderId = orderText?.match(/[a-f0-9]{24}/i)?.[0];
    if (!orderId) {
      throw new Error(`Could not extract an order ID from confirmation text: ${orderText}`);
    }
    return orderId;
  }

  async clickOnOrderBtn() {
    await this.orderbtn.waitFor({ state: 'visible' });
    await this.orderbtn.click();
  }

  async orderScreen(trimmedId) {
    const orderRow = this.orderscreen.filter({ hasText: trimmedId });
    await orderRow.getByRole('button', { name: 'View', exact: true }).click();
  }

  async verifyOrderId() {
    const verifyText = await this.verifyorderid.first().textContent();
    return verifyText?.trim() || '';
  }
}

module.exports = { OrderConfirmationPage };