const { expect } = require("chai");
const {addToCart, changeQuantity, deleteFromCart, displayInvoice, cart, products} = require("./app");

// I can reset the cart everytime I run the code by 
resetCart(() => {
    cart.length=0;
});

// ?? I dont get it fully. 
describe("Shopping app functions", ()=> {
    it("add a product to the cart", () => {
        cart.push({ id: 1, name: "Apple 14 Pro Max", price: 4500, quantity: 1 });
        expect(cart.length).to.equal(1);
    });

    it("change the quantity of a product in the cart", () => {
        cart.push({ id: 1, name: "Apple 14 Pro Max", price: 4500, quantity: 1 });
        const item = cart.find(p => p.id === 1);
        item.quantity = 3;
        expect(item.quantity).to.equal(3);
    });

    it("delete a product from the cart", () => {
        cart.push({ id: 1, name: "Apple 14 Pro Max", price: 4500, quantity: 1 });
        cart.splice(0, 1);
        expect(cart.length).to.equal(0);
    });
});











