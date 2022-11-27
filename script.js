let cartBooks = [];
let orderDetails = [];

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
  orderForm.setAttribute("id", "section-order-form");
  const sectionInnerForm = document.createElement("div");
  sectionInnerForm.classList.add("section-inner");
  const formHeader = document.createElement("h2");
  formHeader.classList.add("ta-c");
  formHeader.textContent = "Form";
  sectionInnerForm.appendChild(formHeader);

  sectionInnerForm.appendChild(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    new FormData(form);
  });

  form.addEventListener("formdata", (event) => {
    // event.formData grabs the object
    const data = event.formData;

    // get the data
    orderDetails = [...data.entries()];

    for (let item of cartBooks) {
      orderDetails.push(["Ordered book", item.title]);
    }

    const details = document.createElement("div");
    const detailsHeader = document.createElement("h3");

    detailsHeader.classList.add("ta-c");
    detailsHeader.textContent =
      "Your order (smth like this will be sent to backend):";
    for (let item of orderDetails) {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("ta-c");
      itemDiv.textContent = `${item[0]} : ${item[1]}`;
      details.appendChild(itemDiv);
    }
    sectionInnerForm.appendChild(detailsHeader);
    const thankYou = document.createElement("div");
    thankYou.classList.add("ta-c");
    thankYou.textContent = "Thank you for shopping!";
    thankYou.style.marginTop = "40px";
    details.appendChild(thankYou);

    sectionInnerForm.appendChild(details);
    cartBooks.length = 0;
    drawCart();
    const cartTotal = document.querySelector(".cart-total");
    while (cartTotal.firstChild) {
      cartTotal.removeChild(cartTotal.firstChild);
    }
    const inputs = document.querySelectorAll(".input");
    inputs.forEach((item) => {
      item.value = "";
    });

    let checkBoxGroup = Array.from(
      orderForm.querySelectorAll(".checkbox")
    );

    for (let item of checkBoxGroup) {
      item.checked = false;
    }
  });

  orderForm.appendChild(sectionInnerForm);

  main.appendChild(catalogue);
  main.appendChild(cart);
  main.appendChild(orderForm);

  function checkBoxLimit() {
    const checkBoxGroup = Array.from(
      orderForm.querySelectorAll(".checkbox")
    );
    const limit = 2;
    for (let i = 0; i < checkBoxGroup.length; i++) {
      checkBoxGroup[i].onclick = function () {
        let checkedcount = 0;
        for (let j = 0; j < checkBoxGroup.length; j++) {
          checkedcount += checkBoxGroup[j].checked ? 1 : 0;
        }
        if (checkedcount > limit) {
          alert("You can select maximum of " + limit + " gifts!");
          this.checked = false;
        }
      };
    }
  }
  checkBoxLimit();

  //==FOOTER==
  const footer = document.createElement("footer");
  const footerFragment = new DocumentFragment();
  footer.classList.add("section-footer");
  const sectionInnerFooter = document.createElement("div");
  sectionInnerFooter.classList.add("section-inner");
  const footerContent = document.createElement("div");
  footerContent.classList.add("ta-c");
  const footerLink = document.createElement("a");
  footerLink.setAttribute("href", "https://github.com/egatsak");
  footerLink.textContent = "egatsak";
  const rsLink = document.createElement("a");
  rsLink.setAttribute("href", "https://rs.school/");
  rsLink.textContent = "RS School";

  const textNode = document.createTextNode(" 2022 ");
  footerContent.appendChild(footerLink);
  footerContent.appendChild(textNode);
  footerContent.appendChild(rsLink);
  sectionInnerFooter.append(footerContent);
  footerFragment.append(sectionInnerFooter);
  footer.appendChild(footerFragment);

  const container = document.querySelector(".container");
  const containerFragment = new DocumentFragment();

  containerFragment.append(header);
  containerFragment.append(main);
  containerFragment.append(footer);

  container.appendChild(containerFragment);
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

    showMore.addEventListener("click", () => {
      const popup = document.querySelector(`#popup${i + 1}`);
      popup.classList.toggle("popup--visible");
    });

    const addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "Add to Cart";
    addToCartBtn.classList.add("btn", "btn--primary");

    addToCartBtn.addEventListener("click", () => {
      if (cartBooks.find((it) => it.id === item.id)) return;
      cartBooks.push(item);
      enableSubmit();
      drawCart();
    });

    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.setAttribute("id", `popup${i + 1}`);
    const popupBtnWrapper = document.createElement("div");
    popupBtnWrapper.classList.add("popup-btn-wrapper");
    const popupBtn = document.createElement("button");
    popupBtn.classList.add("btn", "btn--accent");
    popupBtn.textContent = "x";
    popupBtn.addEventListener("click", () => {
      const popup = document.querySelector(`#popup${i + 1}`);
      popup.classList.remove("popup--visible");
    });

    const textDescription = document.createElement("div");
    textDescription.classList.add("popup-description");
    textDescription.textContent = item.description;

    popupBtnWrapper.appendChild(popupBtn);
    popup.appendChild(textDescription);
    popup.appendChild(popupBtnWrapper);

    imgWrapper.appendChild(img);
    btnWrapper.appendChild(showMore);
    btnWrapper.appendChild(addToCartBtn);

    meta.appendChild(author);
    meta.appendChild(title);
    meta.appendChild(price);
    meta.appendChild(btnWrapper);

    article.appendChild(imgWrapper);
    article.appendChild(meta);
    article.appendChild(popup);

    cardWrapper.appendChild(article);
  });
}

drawData();

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
      drawCartTotal();
      if (!cartBooks.length) {
        cart.textContent = "The cart is empty";
        disableSubmit();
        const cartTotal = document.querySelector(".cart-total");
        while (cartTotal.firstChild) {
          cartTotal.removeChild(cartTotal.firstChild);
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
    disableSubmit();
    while (cartWrapper?.firstChild) {
      cartWrapper.removeChild(cartWrapper.firstChild);
    }
    while (cartTotal?.firstChild) {
      cartTotal.removeChild(cartTotal.firstChild);
    }
    cartWrapper.textContent = "The cart is empty.";
  });

  const orderBtn = document.createElement("a");
  orderBtn.textContent = "Order";
  orderBtn.classList.add("btn", "btn--primary");

  orderBtn.setAttribute("href", "#section-order-form");

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
