fetch('http://localhost:3000/api/products/')
        .then(res => res.json())
        .then(data => {

            displayProducts(data);
        })

function displayProducts(itemList) {
    const productDisplay = document.querySelector("#items")
    for (let i in itemList) {
        productDisplay.innerHTML += `
        <a href="./product.html?id=${itemList[i]._id}">
        <article>
        <img src="${itemList[i].imageUrl}" alt="${itemList[i].altTxt}">
        <h3 class="productName">${itemList[i].name}</h3>
        <p class="productDescription">${itemList[i].description}</p>
        </article>
        </a>
        `
};
};













// document.addEventListener("DOMContentLoaded", function () {
 //   const productDisplay = document.querySelector("#items");
 
   // const productList = [
     //   {
       //     "_id": "107fb5b75607497b96722bda5b504926",
         //   "name": "Kanap Sinopé",
           // "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            //"imageUrl": "kanap01.jpeg",
        //},
    //];
 
    //for (const product of productList) {
      //  const productLink = document.createElement("a");
        //productLink.href = `./product.html?id=${product._id}`; 
       // productLink.innerHTML = `
         //   <article>
           //     <img src="${product.imageUrl}" alt="${product.name}">
             //   <h3 class="productName">${product.name}</h3>
               // <p class="productDescription">${product.description}</p>
            //</article>
        //`;
        //productDisplay.appendChild(productLink);
   // }
 //});
