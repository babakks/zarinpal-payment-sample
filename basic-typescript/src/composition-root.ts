import {
  ZarinpalPaymentManager,
  SandboxZarinpalPaymentSessionFactory,
  DefaultZarinpalPaymentSessionFactory,
  ZarinpalServiceConfig,
  DefaultHttpServiceInvoker,
  PaymentManager
} from "zarinpal-payment";

export function composePaymentInterface(): PaymentManager {
  const zarinpalConfig = new ZarinpalServiceConfig(
    // Put your MerchantID here:
    "00000000-0000-0000-0000-000000000000"
  );
  const invoker = new DefaultHttpServiceInvoker();

  /**
   * The line below initializes a sandbox payment gateway. To use the actual
   * gateway replace "SandboxZarinpalPaymentSessionFactory" with
   * "DefaultZarinpalPaymentSessionFactory".
   */
  const sessionFactory = new SandboxZarinpalPaymentSessionFactory(
    zarinpalConfig,
    invoker
  );

  const paymentManager = new ZarinpalPaymentManager(sessionFactory);

  return paymentManager;
}
