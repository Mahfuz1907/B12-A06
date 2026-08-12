const treesSection = document.getElementById("tree-section");
treesSection.addEventListener("click", (event) => {
  const cartButton = event.target.closest('[id^="cart-button-"]');
  if (!cartButton) return;
  const idNumber = cartButton.id.replace("cart-button-", "");
  const targetTree = document.getElementById(`tree-${idNumber}`);
  const treeName = document.getElementById(`tree-name-${idNumber}`).innerText;
  const treePrice = document.getElementById(`tree-price-${idNumber}`).innerText;

  //adding to cart
  const cartItems = document.getElementById("cart-items");
  let cartItem = document.createElement("div");
  cartItem.className = "cart-item";
  cartItem.innerHTML = `<div class="cart-content">
                <h3>${treeName}</h3>
                <h4 class='cart-price'>${treePrice} <i class="fa-solid fa-x"></i> 1</h4>
              </div>
              <i class="cart-del-button fa-solid fa-xmark cursor-pointer hover:text-lg"></i>`;

  cartItems.prepend(cartItem);

  cartPriceCalculation(cartItems);
});

const cartItems = document.getElementById("cart-items");
cartItems.addEventListener("click", (event) => {
  const delBtn = event.target.closest(".cart-del-button");
  if (!delBtn) return;
  const cartItem = delBtn.closest(".cart-item");
  if (cartItem) {
    cartItem.remove();
    cartPriceCalculation(cartItems);
  }
});

const cartPriceCalculation = (cartItems) => {
  let cartPrices = document.querySelectorAll(".cart-price");
  let prices = [];
  cartPrices.forEach((price) => {
    let cartPriceStr = price.textContent.split(" ")[0].slice(1);
    let cartPrice = Number(cartPriceStr);
    prices.push(cartPrice);
  });
  let total = prices.reduce((total, price) => (total = total + price), 0);
  document.getElementById("cart-total-price").innerText = total;
};
