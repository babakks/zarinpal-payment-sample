# `basic-js`

This is a basic sample project, in JavaScript, that uses the `zarinpal-ts`
package. Due to simplicity, no server-side session management is used. Rather
only one payment session is tracked at any time (`activePaymentSession`).

The server starts up with composing the payment module, by calling the
`composePaymentInterface` method defined in `composition-root.js`. The returned
`PaymentManager` object then stored in the server scope.

The server is set up to watch for `/register` and `/callback` routes. For the
first, a payment session is created, registered on the payment server, and if it
was successful the user is redirected to the payment gateway. For the other
route, the corresponding payment session is recovered (`get` method) and then
the payment is verified. Finally the verification response data is returned to
the user.

# Running

To run the project, open a command prompt in the project's root directory
(where `package.json` resides), and execute the following command:

```
npm run serve
```

If you're using VS Code, you can run the commands above by pressing
`ctrl + shift + P` and then typing "Run Task" and pressing enter/return.

# Using

After you have run the project, open a browser window (Private Browsing
recommended) and type `http://localhost:8080/register` in the address bar and
press enter/return.

You should then be redirected to the payment gateway (either sandboxed or actual
version). After you've accomplished or aborted the payment, you'll be redirected
to the application's `/callback` route on which you can then read the payment
result.
