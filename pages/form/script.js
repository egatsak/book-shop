const cartBooks = JSON.parse(localStorage.getItem("cartBooks")) || [];
let orderDetails = [];

function init() {
  const sectionInnerForm = document.querySelector(
    ".section-order-form .section-inner"
  );
  const form = document.getElementById("order-form");
  const totalAmount = document.createElement("div");
  totalAmount.classList.add("total-amount");
  sectionInnerForm.prepend(totalAmount);

  if (!cartBooks.length) {
    totalAmount.textContent = `Your cart is empty. Please go back to the catalogue and continue shopping.`;
  } else {
    const cartTotal = cartBooks.reduce(
      (acc, curr) => acc + curr.price,
      0
    );
    totalAmount.textContent = `Total: ${cartTotal} $, ${cartBooks.length} items`;
  }

  let today = new Date();
  let tomorrow = new Date(today.setDate(today.getDate() + 1))
    .toISOString()
    .split("T")[0];
  const inputDate = document.querySelector("#date");
  inputDate?.setAttribute("min", tomorrow);
  inputDate?.setAttribute("value", tomorrow);
  const formSubmitBtn = document.querySelector("#submit");

  if (cartBooks.length === 0) {
    formSubmitBtn.setAttribute("disabled", "true");
  }

  function checkBoxLimit() {
    const checkBoxGroup = Array.from(
      form.querySelectorAll(".checkbox")
    );
    const limit = 2;
    for (let i = 0; i < checkBoxGroup.length; i++) {
      checkBoxGroup[i].onclick = function () {
        let checkedcount = 0;
        for (let j = 0; j < checkBoxGroup.length; j++) {
          checkedcount += checkBoxGroup[j].checked ? 1 : 0;
        }
        if (checkedcount > limit) {
          alert("Please select no more than " + limit + " gifts!");
          this.checked = false;
        }
      };
    }
  }
  checkBoxLimit();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    new FormData(form);

    const inputs = document.querySelectorAll(".input");
    inputs.forEach((item) => {
      item.value = "";
    });

    let checkBoxGroup = Array.from(
      form.querySelectorAll(".checkbox")
    );

    for (let item of checkBoxGroup) {
      item.checked = false;
    }
  });

  form.addEventListener("formdata", (event) => {
    const data = event.formData;
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
      itemDiv.textContent = `${item[0]}: ${item[1]}`;
      details.appendChild(itemDiv);
    }
    const thankYou = document.createElement("div");
    thankYou.classList.add("ta-c");
    thankYou.textContent = "Thank you for shopping!";
    thankYou.classList.add("m-top");
    totalAmount.remove();
    totalAmount.classList.add("m-top");
    details.appendChild(totalAmount);
    details.appendChild(thankYou);

    const fragment = new DocumentFragment();
    fragment.append(detailsHeader);
    fragment.append(details);
    sectionInnerForm.appendChild(fragment);
    cartBooks.length = 0;
    localStorage.removeItem("cartBooks");
  });
}

init();
