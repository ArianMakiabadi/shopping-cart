import { productsData } from "./products.js";

const cartBtn = document.querySelector(".navbar__cart");
const cartModal = document.querySelector(".cart");
const backDrop = document.querySelector(".backdrop");
const confirmBtn = document.querySelector(".cart-item-confirm");
const productsDOM = document.querySelector(".products__grid");

// cart modal
function showModal() {
  cartModal.style.opacity = "1";
  cartModal.style.top = "20%";
  backDrop.style.display = "block";
}

function closeModal() {
  cartModal.style.opacity = "0";
  cartModal.style.top = "-100%";
  backDrop.style.display = "none";
}

cartBtn.addEventListener("click", showModal);
confirmBtn.addEventListener("click", closeModal);
backDrop.addEventListener("click", closeModal);

// 1. get products
class Products {
  getProducts() {
    return productsData;
  }
}

// 2. display products
class UI {
  displayProducts(products) {
    let result = "";
    products.forEach((item) => {
      result += `<div class="products__item">
              <div class="product__img-container">
                <img src=${item.imageUrl} alt="" />
              </div>
              <div class="products__details">
                <p class="products__name">${item.title}</p>
                <p class="products__price">${item.price}$</p>
              </div>
              <button class="btn add-to-cart data-id=${item.id}">
                <i class="fas fa-shopping-cart"></i>
                add to cart
              </button>
            </div>`;
    });
    productsDOM.innerHTML = result;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  const productsData = products.getProducts();
  const ui = new UI();
  ui.displayProducts(productsData);
  Storage.saveProducts(productsData);
});

//3. storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
}
