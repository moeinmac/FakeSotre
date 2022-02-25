import LimitText from "./LimitText.js";

// ! Assign To DOM
const main = document.querySelector('main');

// ! EventListener
document.addEventListener('DOMContentLoaded',getProducts);

// ? Get All Products
async function getProducts() {
     const res = await fetch('products/products.json')
     const data = await res.json()
     createProduct(data)
}

function createProduct(products) {
     products.forEach(product => {
          const productElm = document.createElement('div');
          productElm.classList.add('product')
          productElm.dataset.id = product.id
          productElm.innerHTML = `
               <div class="product-img">
                    <img src="${product.image}" alt="">
               </div>
               <div class="product-details">
                    <p class="product-title" title="${product.title}">${LimitText(product.title,3)}</p>
                    <p class="product-price">${product.price}$</p>
               </div>
               <div class="product-buttons">
                    <button class="addto-cart fa-light fa-cart-circle-plus"></button>
                    <button class="addto-description fa-duotone fa-circle-ellipsis"></button>
                    <button class="addto-favorite fa-light fa-heart"></button>
               </div>
          `
     main.appendChild(productElm)
     })
}
