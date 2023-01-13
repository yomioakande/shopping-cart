describe('Add Product to Cart', () => {
  it('allows a user to add a new product to cart', () => {
    cy.visit('/products');
    cy.wait(3000);
    // Select a product
    cy.get(
      ':nth-child(2) > .product-container > :nth-child(2) > .product-info > .product-name'
    ).click();
    cy.wait(5000);
    // Select price
    cy.get('[value="$15"]').click();
    // Increment product quantity
    cy.get('.increment').click();
    // click the Add to cart button
    cy.get('.MuiButtonBase-root').click();

    // continue shopping
    cy.get('.MuiButton-outlined').click();
    // pick another product
    cy.contains('Hard Rock').click();
    cy.wait(5000);
    // Select price
    cy.get('[value="$25"]').click();
    // Increment product quantity
    cy.get('.increment').click();
    // click the Add to cart button
    cy.get('.MuiButtonBase-root').click();
    // Go to the cart
    cy.get('.MuiButton-contained').click();
    cy.wait(4000);
    // Increment an item count
    cy.get(
      ':nth-child(2) > .item-info > .item-qty > :nth-child(3) > [data-testid="AddIcon"]'
    ).click();
    // Decrement an item count
    cy.get(
      ':nth-child(3) > .item-info > .item-qty > :nth-child(1) > [data-testid="RemoveIcon"]'
    ).click();
  });
});
