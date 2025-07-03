// Import product data
import { productsData } from "./products.js";

// DOM Elements
const cartBtn = document.querySelector(".navbar__cart");
const cartModal = document.querySelector(".cart");
const backDrop = document.querySelector(".backdrop");
const confirmBtn = document.querySelector(".cart-item-confirm");
const productsDOM = document.querySelector(".products__grid");
const cartTotal = document.querySelector(".cart-total");
const cartCount = document.querySelector(".navbar__cart-count");
const cartContent = document.querySelector(".cart-content");

let cart = [];

// Modal Logic
const Modal = {
  open() {
    cartModal.style.opacity = "1";
    cartModal.style.top = "20%";
    backDrop.style.display = "block";
  },
  close() {
    cartModal.style.opacity = "0";
    cartModal.style.top = "-100%";
    backDrop.style.display = "none";
  },
};

cartBtn.addEventListener("click", Modal.open);
confirmBtn.addEventListener("click", Modal.close);
backDrop.addEventListener("click", Modal.close);

// Products Class
class Products {
  getAllProducts() {
    return productsData;
  }
}

// UI Class
class UI {
  renderProducts(products) {
    const result = products
      .map(
        (item) => `
        <div class="products__item">
          <div class="product__img-container">
            <img src="${item.imageUrl}" alt="${item.title}" />
          </div>
          <div class="products__details">
            <p class="products__name">${item.title}</p>
            <p class="products__price">${item.price}$</p>
          </div>
          <button class="btn add-to-cart" data-id="${item.id}">
            <i class="fas fa-shopping-cart"></i>
            Add to cart
          </button>
        </div>
      `
      )
      .join("");
    productsDOM.innerHTML = result;
  }

  getAddToCartBtns() {
    const addToCartBtns = document.querySelectorAll(".add-to-cart");
    const btns = [...addToCartBtns]; // converting nodeList to array
    btns.forEach((btn) => {
      const id = parseInt(btn.dataset.id);
      // check if the product id is in cart or not
      const isInCart = cart.find((product) => product.id === id);
      if (isInCart) {
        btn.innerText = "Already In Cart";
        btn.disabled = true;
      }

      btn.addEventListener("click", (e) => {
        e.target.innerText = "Already in cart";
        e.target.disabled = true;
        // get product from products
        const addedProduct = Storage.getProduct(id);
        // add product to cart
        const newItem = { ...addedProduct, quantity: 1 };
        cart.push(newItem);
        // save to local storage
        Storage.saveCart(cart);
        // update cart value and count
        this.setCartValue(cart);
        // adding products to cart modul
        this.addItemToCartModul(newItem);
      });
    });
  }

  setCartValue(cart) {
    let cartItemsCount = 0;
    const totalPrice = cart.reduce((acc, curr) => {
      //setting the count of items
      cartItemsCount += curr.quantity;
      //returning the total value
      return acc + curr.quantity * curr.price;
    }, 0);
    cartTotal.innerText = `total price : ${totalPrice.toFixed(2)} $`;
    cartCount.innerText = cartItemsCount;
  }

  addItemToCartModul(cartItem) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `<img class="cart-item-img" src="${cartItem.imageUrl}"/>
              <div class="cart-item-desc">
                <h4>${cartItem.title}</h4>
                <h5>${cartItem.price}$</h5>
              </div>
              <div class="cart-item-controller">
                <i class="fa-solid fa-minus"></i>
                <p>${cartItem.quantity}</p>
                <i class="fa-solid fa-plus"></i>
                <i class="fas fa-trash-alt"></i>`;
    cartContent.appendChild(div);
  }

  setUpApp() {
    //get cart from storage
    const savedCart = Storage.getCart();
    cart = savedCart;

    this.setCartValue(cart);
    savedCart.forEach((cartItem) => {
      this.addItemToCartModul(cartItem);
    });
  }
}

// Storage Helper
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  static getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  static getProduct(id) {
    const products = JSON.parse(localStorage.getItem("products"));
    return products.find((p) => p.id === parseInt(id));
  }
}

// Init App
document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  const ui = new UI();

  const allProducts = products.getAllProducts();
  Storage.saveProducts(allProducts);

  ui.setUpApp();
  ui.renderProducts(allProducts);
  ui.getAddToCartBtns();
});
