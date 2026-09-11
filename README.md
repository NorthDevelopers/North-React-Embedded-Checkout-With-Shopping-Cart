# Build a Shopping Cart and Securely Embed Payments in a ReactJS App

This is a JavaScript application that uses the React framework and Node.js to demonstrate an ecommerce shopping cart with an embedded payment solution using [North's Embedded Checkout](https://developer.north.com/products/online/embedded-checkout). The application includes a React frontend and a Node.js/Express backend [`North-Node-Embedded-Checkout-API`](https://github.com/NorthDevelopers/North-Node-embedded-checkout) to securely generate checkout sessions and verify transaction status.

## Get Sandbox Credentials

To get started, create a free [North Developer Portal account](https://developer.north.com/register). This will allow you to get the sandbox credentials that are required to test the app. Log in to your account to view the official [Embedded Checkout Integration Guide](https://developer.north.com/products/online/embedded-checkout), then [contact](https://developer.north.com/contact) North's Sales Engineering team to get sandbox credentials added to your Developer Portal account.

## Follow Along with the Tutorial

When you're ready to start building your app, you can follow along with [this tutorial](https://developer.north.com/blog/embedded-payments-react-app-shopping-cart) for step-by-step instructions.

## Completed App

Your completed ecommerce app will look similar to the following:

![](/src/assets/payments-hub-react-embedded-checkout-with-cart.png)

Click the "View Details" button to open a product page:

![](/src/assets/payments-hub-react-embedded-checkout-product-with-cart.png)

Click the "Shopping Cart" button to open the cart modal, which displays the items in your cart, the total order amount, and allows users to edit the contents of their cart:

![](/src/assets/payments-hub-react-embedded-checkout-shopping-cart.png)

Click the "Checkout" button to go to the checkout page, where a secure checkout form is embedded directly so customers can enter their payment information and submit an order:

![](/src/assets/payments-hub-react-embedded-checkout-with-cart-checkout-form.png)
