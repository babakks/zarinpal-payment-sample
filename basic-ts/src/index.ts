import { IncomingMessage, ServerResponse, createServer } from "http";
import * as url from "url";

import { composePaymentInterface } from "./composition-root";
import { PaymentSession } from "zarinpal-ts";

const paymentManager = composePaymentInterface();

let activePaymentSession: PaymentSession = undefined;

createServer(handleRequest).listen(8080);

async function handleRequest(req: IncomingMessage, res: ServerResponse) {
  const pathname = url.parse(req.url).pathname;

  if (pathname === "/register") {
    startPayment(req, res);
  } else if (pathname === "/callback") {
    verifyPayment(req, res);
  }
}

async function startPayment(req: IncomingMessage, res: ServerResponse) {
  activePaymentSession = paymentManager.create();
  activePaymentSession.payment.amount = 10000;
  activePaymentSession.payment.description = "Showcase payment.";
  activePaymentSession.payment.email = "myemail@someserver.com";
  activePaymentSession.payment.mobile = "09111111111";
  activePaymentSession.payment.name = "John Doe";

  const registrationResult = await activePaymentSession.register(
    "http://localhost:8080/callback"
  );

  if (registrationResult.isSuccessful) {
    res.writeHead(301, { Location: activePaymentSession.gateway() });
  }

  res.end();
}

async function verifyPayment(req: IncomingMessage, res: ServerResponse) {
  const verificationResult = await activePaymentSession.verify(req);

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(verificationResult));
}
