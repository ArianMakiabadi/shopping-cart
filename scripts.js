const cartBtn = document.querySelector(".navbar__cart");
const cartModal = document.querySelector(".cart");
const backDrop = document.querySelector(".backdrop");
const confirmBtn = document.querySelector(".cart-item-confirm");

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
