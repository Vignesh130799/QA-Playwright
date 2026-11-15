const {LoginPage} = require("./LoginPage")
const {MyCartPage} = require("./MyCartPage")
const {Dashboardpage} = require("./Dashboardpage");
const {PaymentMethod} = require("./PaymentMethod")
const {OrderConfirmationPage} = require("./OrderConfirmationPage")



class POmanager
{
    constructor(page)
    {
        this.page = page;
        this.loginpage = new LoginPage(this.page);
        this.dashboardpage = new Dashboardpage(this.page);
        this.mycartpage = new MyCartPage(this.page);
        this.paymentmethod = new PaymentMethod(this.page);
        this.orderconfirmationpage = new OrderConfirmationPage(this.page);
    }


    getLoginpage()
    {
        return this.loginpage;
    }

    getDashBoardPage()
    {
        return this.dashboardpage;
    }

    getMyCartPage()
    {
        return this.mycartpage;
    }
    getPaymentMethod()
    {
        return this.paymentmethod;
    }

    getOrderConfirmationPage()
    {
        return this.orderconfirmationpage;
    }

};

module.exports = {POmanager};