import { menuArray } from "./data.js";

let ordersArray = [];
const cardForm=document.getElementById('card-details-form')
const orderSuccess=document.getElementById('order-success');
document.addEventListener("click", function (e) {
    e.preventDefault()
  // console.log(e.target.dataset)
  if (e.target.dataset.addorder) {
    addItemToOrders(e.target.dataset.addorder);
    orderSuccess.style.display='none'
  } else if (e.target.dataset.removeorder) {
    removeItemFromOrders(e.target.dataset.removeorder);
  } else if(e.target.id==='complete-order-btn'){
    document.getElementById('modal').style.display="flex"
  } else if(e.target.id==='pay-btn'){
    const formData=new FormData(cardForm)
    document.getElementById('modal').style.display="none"
    ordersArray=[]
    renderOrders()
    orderSuccess.style.display='flex'
    document.getElementById('order-success').innerHTML=`
        <h2>Thanks, ${formData.get('name')}! Your order is on its way!</h2>
    `
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
