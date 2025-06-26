// Import product data
import { productsData } from "./products.js";

// DOM Elements
const cartBtn = document.querySelector(".navbar__cart");
const cartModal = document.querySelector(".cart");
const backDrop = document.querySelector(".backdrop");
const confirmBtn = document.querySelector(".cart-item-confirm");
const productsDOM = document.querySelector(".products__grid");

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
}

// Storage Helper
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
}

// Init App
document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  const ui = new UI();

  const allProducts = products.getAllProducts();
  ui.renderProducts(allProducts);
  Storage.saveProducts(allProducts);
});
