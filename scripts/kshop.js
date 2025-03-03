document.addEventListener('DOMContentLoaded', function() {
  const apiButton = document.getElementById('apiButton');
  const productsDiv = document.getElementById('products');
  let allProducts = []; // Array to store all products
  let visibleCount = 10; // Number of initially visible products

  apiButton.addEventListener('click', function() {
      fetch("https://dummyjson.com/carts")
          .then((res) => res.json())
          .then((data) => {
              console.log(data); // It's helpful to see the structure

              if (!productsDiv) {
                  console.error("Element with ID 'products' not found in the document.");
                  return; // Exit if the target element doesn't exist
              }

              // Flatten the products from all carts into a single array
              data.carts.forEach(cart => {
                  allProducts.push(...cart.products);
              });

              // Display the first set of products
              displayProducts(allProducts.slice(0, visibleCount));

              // Create and append "See More" button
              const seeMoreButton = document.createElement('button');
              seeMoreButton.innerText = 'See More';
              seeMoreButton.classList.add('mt-4', 'bg-blue-500', 'text-white', 'px-4', 'py-2', 'rounded');
              productsDiv.appendChild(seeMoreButton);

              // Add event listener for "See More" button
              seeMoreButton.addEventListener('click', () => {
                  visibleCount += 10; // Increase the number of visible products
                  displayProducts(allProducts.slice(0, visibleCount));

                  // Hide button if all products are displayed
                  if (visibleCount >= allProducts.length) {
                      seeMoreButton.style.display = 'none';
                  }
              });
          })
          .catch(error => console.error("Error fetching data:", error));
  });

  function displayProducts(products) {
      // Clear previous product displays to avoid duplicates
      productsDiv.innerHTML = '';

      products.forEach(product => {
          // Create item card div
          const div = document.createElement('div');
          div.classList.add('flex', 'flex-col', 'items-center', 'border', 'p-4', 'm-2');

          // Create h1 and append to card div
          const h1 = document.createElement('h1');
          h1.innerText = product.title;
          h1.classList.add('text-xl', 'font-bold', 'mb-2');
          div.appendChild(h1);

          // Create an img and append to card div
          const img = document.createElement('img');
          img.setAttribute('src', product.thumbnail);
          img.setAttribute('alt', product.title);
          img.classList.add('h-[200px]', 'w-auto', 'object-cover');
          div.appendChild(img);

          // Create price paragraph and append to card div
          const price = document.createElement('p');
          price.innerText = `Price: $${product.price}`;
          price.classList.add('text-gray-700');
          div.appendChild(price);

          // Append card div to products div
          productsDiv.appendChild(div);
      });
  }
});




// fetch("https://fakestoreapi.com/products")
//   .then((res) => res.json())
//   .then((data) => {
//     console.table(data);
//     for (const item of data) {
//         //create item card div
//         const div = document.createElement('div');
//         div.classList.add('flex','flex-col','items-center');

//         //create h1 and append to card div
//         const h1 = document.createElement('h1');
//         h1.innerText = item.title;
//         h1.classList.add('text-2xl', 'font-bold')
//         div.appendChild(h1);

//         // create an img and append to card div
//         const img = document.createElement('img')
//         img.setAttribute('src', item.image);
//         img.setAttribute('alt', item.title);
//         img.classList.add('h-[250px]');
//         div.appendChild(img);

//         const h3 = document.createElement('h4')
//         h3.innerText = item.price;
//         h3.classList.add('font-bold')
//         div.appendChild(h3);

//         // append card div to prodructs div
//         const parent = document.getElementById('products');
//         parent.appendChild(div);
//     }
//   });
