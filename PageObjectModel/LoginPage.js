class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('input[type="email"]');
    this.password = page.locator('input[type="password"]');
    this.loginbtn = page.getByRole('button', { name: /login/i });
  }

  async launchUrl() {
    await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async validLogin(username, password) {
    await this.username.waitFor({ state: 'visible' });
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginbtn.click();
  }
}

module.exports = { LoginPage };