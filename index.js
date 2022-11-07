import { menuArray } from "./data.js";

console.log(menuArray);

function getMenuHtml() {
  let menuHtml = "";
  menuArray.forEach((menu) => {
    menuHtml += `
        <div class="menu-container">
            <div class="menu-items">
                <img src=${menu.emoji} alt="">
                <div class="menu-details">
                    <h2>${menu.name}</h2>
                    <p>${menu.ingredients}</p>
                    <h2>${menu.price}</h2>
                </div>
            </div>
            <div class="menu-order-btn">
                <i class="fa-thin fa-plus"></i>
            </div>
        </div>
        `;
  });
  return menuHtml;
}

function render() {
//   console.log(getMenuHtml());
  document.getElementById('main').innerHTML=getMenuHtml()
}

render();
