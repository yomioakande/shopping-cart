This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## How to run the project

First, run the development server:

Create a .env file and copy the content of the sample.env file into it

run "npm install" or "yarn install"

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Additional features

The additional features implemented are as follows:

1. Product List page
2. Product details page
3. Add to wishlish - not fully implemented but you get notified of the action
4. Add to compare - not fully implemented but you get notified of the action
5. Empty Cart feature
6. Dummy checkout confirmation page
7. Product list pagination
8. List of all gift cards brands in the filter section on product list page
9. Rating system
10. Mobile responsive filter section which collapses to screen bottom

## Approach to the product and tradeoffs

I approach the product from a mobile first and user perspective.
The design elements, components and placements are made to aid a seamless and interesting experience across board, such as:

1. Giving users the option to either continue shopping or go to cart after adding a product to the cart, so as not to cause back-and-forth, frustration and cart abandonment
2. Placing the shopping cart icon in the top right corner
3. Use the shopping cart icon to display the number of items in the cart
4. notifing users when they add items to their carts
5. Asking users to confirm whenever a delete or remove action is to be carried out
6. Product recommendations on the cart and product details page

Some of the tradeoffs I had to make because of time constraits are

1. Not using a minicart or sidecart whereby users can see products in their carts whenever they hover the cart icon on any page
2. Not fully optimizing the pages

## Other notes

I used Next.js and MUI however, I implemented all logics and styling myself and used some advanced CSS3 features such as using the calc() to set some of my font sizes and make them responsive on different screen sizes - the fontsize will adapt with the screen size.

I also added some wait to the e2e test done using cypress, though I know it's not a good practice but I added it to test under a slow and poor network performance.
