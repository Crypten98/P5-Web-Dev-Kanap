const url = window.location 
const queryString = window.location.search

const urlPar = new URLSearchParams (queryString)
const id = urlPar.get("id")

fetch('http://localhost:3000/api/products')
.then(res => res.json())
.then(data => {
    displayProductDetails(data);
    
});
const productImage = document.querySelector[".item__img"];
const productTitle = document.querySelector["#title"];
const productPrice = document.querySelector["#price"];
const productDescription = document.querySelector["#description"];
const productColor = document.querySelector["#color"];
const productQuantity = document.querySelector['#quantity'] //['#quanity']

function displayProductDetails (productDataFromServer) { 
    //to properly define the function. [productDataFromServer]{
    for (product of productDataFromServer){
        if(id===product._id)
        {
            productImage.innerHtml = `<img src="${product.imageUrl}" alt="${product.altTxt}">`; 
            productName.textContent = `${product.name}`;
            productPrice.textContent = `${product.price}`;
            productDescription.textContent = `${product.description}`;
            for (let color of product.colors){
                productColor.innerHtml += `<option value=${color}>${color}</option>`
            };
        };
    };
};
const addToCartButton = document.getElementById ('addToCart');
addToCartButton.addEventListener ('click', (event) => {event.preventDefault();
addProductToCart ();

}); //:
function cartInitLocalStorage(){
    if (!localStorage.getItem('cart')){
        localStorage.setItem('cart','[]')

    };
}


function addProductToCart(){
    cartInitLocalStorage ();
    const productInfo = {
        id: id,
        name: productName.textContent,
        color: productColor.value,
        description: productDescription.textContent,
        imageUrl: product.imageUrl,
        altTxt: product.altTxt,
    };
    let cartParse = json.parse(localStorage.getItem('cart'));                //let cartParse = json.parse(localStorage.getItem('cart'));
    let push = true; 
    if (productQuantity.value == 0 || productColor.value === "" )
{
    alert("add product color or quanitity");
}
else 
if (cartParse){
    cartParse.forEach(function(product,key) {
        if (product.id == id && 
        product.color == productColor.value){
            cartParse[key].quantity = parseInt(product.quanitity) + parseInt(productQuantity.value);
            push = false;
            cart = localStorage.setItem('cart', json.stringify(cartParse));
            cartParse = json.parse (localStorage.getItem('cart')); 
            alert("You have added product to the cart");
        };

    });
};

if (push){
    cartParse.push(productInfo);
    cart = json.stringify(cartParse);
    localStorage.setItem('cart', cart);
    cartParse = json.parse(cart);
    alert ("You have added a product to the cart");
};
};

