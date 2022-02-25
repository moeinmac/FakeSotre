import LimitText from "./LimitText.js";


// ! Assign To DOM
const main = document.querySelector('main');
const search = document.querySelector('.searchContainer input');
const navItems = document.querySelectorAll('nav ul');
const cartCounter = document.querySelector('.cartCounter')
const asideContainer = document.querySelector('.aside-container');

// ! EventListener
document.addEventListener('DOMContentLoaded',getProducts);
search.addEventListener('input' , searchProducts);
navItems.forEach(navItem => navItem.addEventListener('click',filterProducts));

// ? Get All Products
async function getProducts() {
     const res = await fetch('products/products.json')
     const data = await res.json()
     createProduct(data)
}

function createProduct(products) {
     if(products.length == 0) {
          main.innerHTML = `Sorry There's not available product... :(`
          return
     } 
     main.innerHTML = ``
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
     // To Check Click Buttons For Each Products
     productElm.addEventListener('click',productButtons)
     main.appendChild(productElm)
     })
}


// ? Search Products 

async function searchProducts() {
     if(search.value.length < 2) return
     const res = await fetch('products/products.json')
     const data = await res.json()
     const filteredProducts = data.filter(product => product.title.toLowerCase().includes(search.value))
     createProduct(filteredProducts)
}

// ? Filter Products

async function filterProducts(ev){
     const res = await fetch('products/products.json')
     const data = await res.json()
     const filteredProducts = data.filter(product => product.category === ev.target.innerHTML.toLowerCase())
     if(filterProducts.length ==0) return
     createProduct(filteredProducts)
}

// ? Handle Product Button Click
function productButtons(ev) {
     ev.target.disabled = true
     switch (ev.target.classList[0]) {
          case "addto-cart":
               ev.target.classList.remove('fa-light','fa-cart-circle-plus');
               ev.target.classList.add('fa-duotone','fa-cart-circle-check');
               addToCartButton(ev)
               break;
          case "addto-description":
               break;
          case "addto-favorite":
               break;
     }
}

async function addToCartButton(ev) {
     const res = await fetch('products/products.json')
     const data = await res.json()
     const productAdded = data[ev.path[2].getAttribute('data-id')]

     // Count the number of products in the cart
     cartCounter.innerHTML = eval(cartCounter.innerHTML) + 1

     // Create Cart For Each Product
     const productCart = document.createElement('div');
     productCart.classList.add('product-cart')
     productCart.classList.add('product')
     productCart.innerHTML = `
     <div class="product-cart-img">
          <img src="${productAdded.image}" alt="">
          </div>
          <div class="product-details product-cart-detail">
               <p class="product-title">${LimitText(productAdded.title,3)}</p>
               <p class="product-price">${productAdded.price}$</p>
          </div>
          <div class="product-cart-buttons">
               <div class="product-cart-controller">
                    <i class="fa-solid fa-chevron-up"></i>
                    <span>0</span>
                    <i class="fa-solid fa-chevron-down"></i>
               </div>
               <i class="fa-solid fa-trash-can"></i>
          </div>
     `
     const cartFooter = document.querySelector('.cart-footer');
     asideContainer.insertBefore(productCart,cartFooter);
     totalPrice(cartFooter.childNodes[1],productAdded.price);
}