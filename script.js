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

  const cart = document.createElement("section");
  cart.classList.add("section-cart");
  const sectionInnerCart = document.createElement("div");
  sectionInnerCart.classList.add("section-inner");
  const cartHeader = document.createElement("h2");
  cartHeader.classList.add("ta-c");
  cartHeader.textContent = "Cart";
  sectionInnerCart.appendChild(cartHeader);
  cart.appendChild(sectionInnerCart);

  const form = document.getElementById("orderForm");
  form.remove();
  form.classList.add("section-order-form");
  const orderForm = document.createElement("section");
  orderForm.classList.add("section-order-form");
  const sectionInnerForm = document.createElement("div");
  sectionInnerForm.classList.add("section-inner");
  sectionInnerForm.appendChild(form);
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

  data.forEach((item) => {
    const article = document.createElement("article");
    article.classList.add("card");

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
    const addToCart = document.createElement("button");
    addToCart.textContent = "Add to Cart";
    addToCart.classList.add("btn", "btn--accent");

    imgWrapper.appendChild(img);

    btnWrapper.appendChild(showMore);
    btnWrapper.appendChild(addToCart);

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
