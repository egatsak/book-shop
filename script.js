let cartBooks = [];

document.body.addEventListener("click", () => {
  console.log(cartBooks);
});

function init() {
  //==HEADER==
  const header = document.createElement("header");
  header.classList.add("section-header");
  const sectionInnerHeader = document.createElement("div");
  sectionInnerHeader.classList.add("section-inner");
  header.appendChild(sectionInnerHeader);
  const logo = document.createElement("h1");
  logo.classList.add("logo");
  const logoLink = document.createElement("a");
  logoLink.classList.add("logo__link");
  logoLink.setAttribute("href", "#");
  logoLink.setAttribute("aria-label", "Book shop main page");
  logoLink.textContent = "Book shop";
  logo.append(logoLink);
  sectionInnerHeader.appendChild(logo);

  //==MAIN==
  const main = document.createElement("main");
  const catalogue = document.createElement("section");
  const sectionInnerCatalogue = document.createElement("div");
  sectionInnerCatalogue.classList.add("section-inner");
  catalogue.classList.add("section-catalogue");
  const catalogueHeader = document.createElement("h2");
  catalogueHeader.classList.add("ta-c");
  catalogueHeader.textContent = "Catalogue";
  const cardWrapper = document.createElement("div");
  cardWrapper.classList.add("card-wrapper");
  sectionInnerCatalogue.appendChild(catalogueHeader);
  sectionInnerCatalogue.appendChild(cardWrapper);
  catalogue.appendChild(sectionInnerCatalogue);

  //==CART==
  const cart = document.createElement("section");
  cart.classList.add("section-cart");
  const sectionInnerCart = document.createElement("div");
  sectionInnerCart.classList.add("section-inner");
  const cartHeader = document.createElement("h2");
  cartHeader.classList.add("ta-c");
  cartHeader.textContent = "Cart";
  const cartWrapper = document.createElement("div");
  cartWrapper.classList.add("cart-wrapper");
  if (!cartBooks.length) {
    cartWrapper.textContent = "The cart is empty.";
  }
  const cartTotal = document.createElement("div");
  cartTotal.classList.add("cart-total");

  sectionInnerCart.appendChild(cartHeader);
  sectionInnerCart.appendChild(cartWrapper);
  sectionInnerCart.appendChild(cartTotal);

  cart.appendChild(sectionInnerCart);

  //===FORM
  const form = document.getElementById("orderForm");
  let today = new Date();
  let tomorrow = new Date(today.setDate(today.getDate() + 1))
    .toISOString()
    .split("T")[0];
  const inputDate = document.querySelector("#date");
  inputDate?.setAttribute("min", tomorrow);
  inputDate?.setAttribute("value", tomorrow);
  const formSubmitBtn = document.querySelector("#submit");
  formSubmitBtn.setAttribute("disabled", "true");

  form.remove();
  const orderForm = document.createElement("section");
  orderForm.classList.add("section-order-form");
  const sectionInnerForm = document.createElement("div");
  sectionInnerForm.classList.add("section-inner");
  const formHeader = document.createElement("h2");
  formHeader.classList.add("ta-c");
  formHeader.textContent = "Form";
  sectionInnerForm.appendChild(formHeader);

  sectionInnerForm.appendChild(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  orderForm.appendChild(sectionInnerForm);

  main.appendChild(catalogue);
  main.appendChild(cart);
  main.appendChild(orderForm);

  //==FOOTER==
  const footer = document.createElement("footer");
  footer.classList.add("section-footer");
  const sectionInnerFooter = document.createElement("div");
  sectionInnerFooter.classList.add("section-inner");
  const footerContent = document.createElement("div");
  footerContent.textContent = "Footer";
  sectionInnerFooter.appendChild(footerContent);
  footer.appendChild(sectionInnerFooter);

  const container = document.querySelector(".container");
  container.insertAdjacentElement("beforeend", header);
  container.insertAdjacentElement("beforeend", main);
  container.insertAdjacentElement("beforeend", footer);
}

async function fetchData() {
  try {
    const response = await fetch("./books.json");
    const data = await response.json();

    if (!response.status) {
      throw new Error("Something went wrong!");
    }

    if (data) {
      return data;
    }
  } catch (e) {
    console.log(e?.message);
  }
}

init();

async function drawData() {
  const data = await fetchData();
  const cardWrapper = document.querySelector(".card-wrapper");

  data.forEach((item, i) => {
    item.id = i + 1;
    const article = document.createElement("article");
    article.classList.add("card");
    article.setAttribute("id", `card${i + 1}`);

    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("card__img-wrapper");
    const img = document.createElement("img");
    img.setAttribute("src", item.imageLink);
    img.setAttribute("alt", item.title);

    const meta = document.createElement("div");
    meta.classList.add("card__meta");

    const author = document.createElement("div");
    author.textContent = item.author;
    author.classList.add("card__meta-author");
    const title = document.createElement("div");
    title.textContent = item.title;
    title.classList.add("card__meta-title");

    const price = document.createElement("div");
    price.textContent = `${item.price}` + " $";
    price.classList.add("card__meta-price");

    const btnWrapper = document.createElement("div");
    btnWrapper.classList.add("btn-group");

    const showMore = document.createElement("button");
    showMore.textContent = "Show more";
    showMore.classList.add("btn", "btn--primary");
    const addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "Add to Cart";
    addToCartBtn.classList.add("btn", "btn--accent");

    addToCartBtn.addEventListener("click", () => {
      /* addToCart(item); */
      if (cartBooks.find((it) => it.id === item.id)) return;
      cartBooks.push(item);
      enableSubmit();
      drawCart();
    });

    imgWrapper.appendChild(img);
    btnWrapper.appendChild(showMore);
    btnWrapper.appendChild(addToCartBtn);

    meta.appendChild(author);
    meta.appendChild(title);
    meta.appendChild(price);
    meta.appendChild(btnWrapper);

    article.appendChild(imgWrapper);
    article.appendChild(meta);

    cardWrapper.appendChild(article);
  });
}

drawData();
/* 
function addToCart(item) {
  cartBooks.push(item);
  const cart = document.querySelector(".section-cart .section-inner");
  const cartItem = document.createElement("div");
  cartItem.setAttribute("id", item.id);
  const imgWrapper = document.createElement("div");
  imgWrapper.classList.add("card__img-wrapper");
  const img = document.createElement("img");
  img.setAttribute("src", item.imageLink);
  img.setAttribute("alt", item.title);

  const meta = document.createElement("div");
  meta.classList.add("card__meta");

  const author = document.createElement("div");
  author.textContent = item.author;
  author.classList.add("card__meta-author");
  const title = document.createElement("div");
  title.textContent = item.title;
  title.classList.add("card__meta-title");

  const price = document.createElement("div");
  price.textContent = `${item.price}` + " $";
  price.classList.add("card__meta-price");
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.classList.add("btn", "btn--accent");
  deleteBtn.addEventListener("click", () => {
    cart.removeChild(document.getElementById(item.id));
    cartBooks = cartBooks.filter((it) => it.id !== item.id);
  });

  imgWrapper.appendChild(img);

  meta.appendChild(author);
  meta.appendChild(title);
  meta.appendChild(price);
  meta.appendChild(deleteBtn);

  cartItem.appendChild(imgWrapper);
  cartItem.appendChild(meta);
  cart.appendChild(cartItem);
}
 */

function drawCart() {
  const cart = document.querySelector(".cart-wrapper");

  if (!cartBooks.length) {
    cart.textContent = "The cart is empty";
    disableSubmit();
    return;
  }

  if (cart.textContent) {
    cart.textContent = "";
  }

  while (cart.firstChild) {
    cart.removeChild(cart.firstChild);
  }

  cartBooks.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.setAttribute("id", item.id);
    cartItem.classList.add("cart-item");

    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("cart-item__img-wrapper");
    const img = document.createElement("img");
    img.setAttribute("src", item.imageLink);
    img.setAttribute("alt", item.title);

    const meta = document.createElement("div");
    meta.classList.add("cart-item__meta");

    const author = document.createElement("div");
    author.textContent = item.author;
    author.classList.add("cart-item__meta-author");
    const title = document.createElement("div");
    title.textContent = item.title;
    title.classList.add("cart-item__meta-title");
    const price = document.createElement("div");
    price.textContent = `${item.price}` + " $";
    price.classList.add("cart-item__meta-price");
    const btnWrapper = document.createElement("div");
    btnWrapper.classList.add("btn-group");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("btn", "btn--accent");

    deleteBtn.addEventListener("click", () => {
      cart.removeChild(document.getElementById(item.id));
      cartBooks = cartBooks.filter((it) => it.id !== item.id);
      if (cartBooks.length === 0) {
        const cartTotal = document.querySelector(".cart-total");
        while (cartTotal.firstChild) {
          cartTotal.removeChild(cartTotal.firstChild);
        }
        if (!cartBooks.length) {
          cart.textContent = "The cart is empty";
        }
      }
    });

    btnWrapper.appendChild(deleteBtn);
    imgWrapper.appendChild(img);

    meta.appendChild(author);
    meta.appendChild(title);
    meta.appendChild(price);
    meta.appendChild(btnWrapper);

    cartItem.appendChild(imgWrapper);
    cartItem.appendChild(meta);
    cart.appendChild(cartItem);
  });

  drawCartTotal();
}

function drawCartTotal() {
  const cartTotal = document.querySelector(".cart-total");
  while (cartTotal?.firstChild) {
    cartTotal.removeChild(cartTotal.firstChild);
  }
  const cartWrapper = document.querySelector(".cart-wrapper");

  const totalAmount = document.createElement("div");
  totalAmount.classList.add("cart-total-amount");
  totalAmount.textContent = `Total: ${cartBooks.reduce(
    (acc, curr) => acc + curr.price,
    0
  )} $, ${cartBooks.length} items`;

  const btnWrapper = document.createElement("div");
  btnWrapper.classList.add("btn-group");
  const clearAllBtn = document.createElement("button");
  clearAllBtn.textContent = "Clear all";
  clearAllBtn.classList.add("btn", "btn--accent");

  clearAllBtn.addEventListener("click", () => {
    cartBooks.length = 0;
    while (cartWrapper?.firstChild) {
      cartWrapper.removeChild(cartWrapper.firstChild);
    }
    while (cartTotal?.firstChild) {
      cartTotal.removeChild(cartTotal.firstChild);
    }
    cartWrapper.textContent = "The cart is empty.";
  });

  const orderBtn = document.createElement("button");
  orderBtn.textContent = "Order";
  orderBtn.classList.add("btn", "btn--primary");

  orderBtn.addEventListener("click", () => {});

  btnWrapper.appendChild(clearAllBtn);
  btnWrapper.appendChild(orderBtn);

  cartTotal.appendChild(totalAmount);
  cartTotal.appendChild(btnWrapper);
}

function disableSubmit() {
  const formSubmitBtn = document.querySelector("#submit");
  formSubmitBtn.setAttribute("disabled", "true");
}

function enableSubmit() {
  const formSubmitBtn = document.querySelector("#submit");
  formSubmitBtn.removeAttribute("disabled");
}
