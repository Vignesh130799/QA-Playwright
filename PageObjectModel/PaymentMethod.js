class PaymentMethod {
  constructor(page) {
    this.page = page;
    this.creditnumber = page.locator(".field input[class='input txt text-validated']");
    this.expiryM = page.locator("select[class='input ddl']").first();
    this.expiryD = page.locator("select[class='input ddl']").last();
    this.cvv = page.locator(".field [class='input txt']").first();
    this.country = page.getByPlaceholder('Select Country');
    this.dropdownOptions = page.locator('.ta-results button');
    this.placeholderbtn = page.locator('a:has-text("Place Order"), button:has-text("Place Order")').first();
  }

  async personalInformation(creditnumber, expiryM, expiryD, nameOnCard) {
    await this.creditnumber.waitFor({ state: 'visible' });
    await this.creditnumber.fill(creditnumber);
    await this.expiryM.selectOption(expiryM);
    await this.expiryD.selectOption(expiryD);
    await this.cvv.fill(nameOnCard);
  }

  async shippingInformation(country, countryName) {
    await this.country.waitFor({ state: 'visible' });
    await this.country.pressSequentially(country);

    await this.dropdownOptions.filter({
      hasText: new RegExp(`^\\s*${(countryName).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'i'),
    }).first().click();

    await this.placeholderbtn.waitFor({ state: 'visible' });
    await this.placeholderbtn.click();
  }
}

module.exports = { PaymentMethod };