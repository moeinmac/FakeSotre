// ! Assign To DOM
const main = document.querySelector('main');

// ! EventListener
document.addEventListener('DOMContentLoaded',getProducts);

// ? Get All Products
async function getProducts() {
     const res = await fetch('products/products.json')
     const data = await res.json()
     console.log(data);
}