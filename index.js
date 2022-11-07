import { menuArray } from "./data.js";

let ordersArray = [];
document.addEventListener("click", function (e) {
  // console.log(e.target.dataset)

  if (e.target.dataset.addorder) {
    // console.log(e.target.dataset.addorder)
    addItemToOrders(e.target.dataset.addorder);
  } else if (e.target.dataset.removeorder) {
    removeItemFromOrders(e.target.dataset.removeorder);
  }
});

function removeItemFromOrders(orderId) {
  ordersArray = ordersArray.filter((order) => order.id != orderId);
  renderOrders();
  
}

function addItemToOrders(orderId) {
  orderId = parseInt(orderId);
  const getItemOrderObj = menuArray.filter((menu) => menu.id === orderId)[0];
  ordersArray.unshift(getItemOrderObj);
  renderOrders();

}

function renderOrders() {
  let ordersHtml = "";
  let totalPrice = 0;
  
  ordersArray.forEach((order) => {
    ordersHtml += `
            <div class="each-order">
                <div class="each-order-name">
                    <h2>${order.name}</h2>
                    <button data-removeorder=${order.id}>remove</button>
                </div>
                <h2>$${order.price}</h2>
            </div>
        `;
    totalPrice += order.price;
  });

  document.getElementById("total-orders").innerHTML = ordersHtml;
  document.getElementById("total-price").textContent = `$${totalPrice}`;
  
  if(totalPrice>0){
    document.getElementById('orders-container').style.display="block"
  }else{
    document.getElementById('orders-container').style.display="none"

  }
}

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
                    <h2>$${menu.price}</h2>
                </div>
            </div>
            <div class="menu-order-btn" data-addorder=${menu.id}>
                <i class="fa-thin fa-plus" data-addorder=${menu.id}></i>
            </div>
        </div>
        `;
  });
  return menuHtml;
}

function render() {
  //   console.log(getMenuHtml());
  document.getElementById("main").innerHTML = getMenuHtml();
}

render();
