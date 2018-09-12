const http = require("http");
const url = require("url");
const cr = require("./composition-root");

const paymentManager = cr.composePaymentInterface();
let activePaymentSession = undefined;

http.createServer(handleRequest).listen(8080);

async function handleRequest(req, res) {
    const pathname = url.parse(req.url).pathname;

    if (pathname === "/register") {
        startPayment(req, res);
    } else if (pathname === "/callback") {
        verifyPayment(req, res);
    }
}

function startPayment(req, res) {
    activePaymentSession = paymentManager.create();
    activePaymentSession.payment.amount = 10000;
    activePaymentSession.payment.description = "Showcase payment.";
    activePaymentSession.payment.email = "myemail@someserver.com";
    activePaymentSession.payment.mobile = "09111111111";
    activePaymentSession.payment.name = "John Doe";

    return activePaymentSession.register("http://localhost:8080/callback").then(
        result => {
            if (result.isSuccessful) {
                res.writeHead(301, {
                    Location: activePaymentSession.gateway()
                });
            }

            res.end();
        },
        reason => {
            res.end(JSON.stringify(reason));
        }
    );
}

function verifyPayment(req, res) {
    return activePaymentSession.verify(req).then(
        result => {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        },
        reason => {
            res.end(JSON.stringify(reason));
        }
    );
}
