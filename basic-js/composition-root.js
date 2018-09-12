const zarinpal = require("zarinpal-ts");

function composePaymentInterface() {
    const zarinpalConfig = new zarinpal.ZarinpalServiceConfig(
        // Put your MerchantID here:
        "00000000-0000-0000-0000-000000000000"
    );
    const invoker = new zarinpal.DefaultHttpServiceInvoker();

    /**
     * The line below initializes a sandboxed payment gateway. To use the actual
     * gateway replace "SandboxZarinpalPaymentSessionFactory" with
     * "DefaultZarinpalPaymentSessionFactory".
     */
    const sessionFactory = new zarinpal.SandboxZarinpalPaymentSessionFactory(
        zarinpalConfig,
        invoker
    );

    const paymentManager = new zarinpal.ZarinpalPaymentManager(sessionFactory);

    return paymentManager;
}

exports.composePaymentInterface = composePaymentInterface;
