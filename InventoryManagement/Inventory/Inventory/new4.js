      // JavaScript to update subcategory options based on selected category
      function updateSubCategoryOptions() {
        const categorySelect = document.getElementById('category');
        const subCategorySelect = document.getElementById('subCategory');

        document.getElementById('categoryError').style.display = 'none';
  
        // Clear existing options
        subCategorySelect.innerHTML = '<option value="">Select Subcategory</option>';
  
        // Populate subcategory options based on selected category
        if (categorySelect.value === 'electronics') {
          subCategorySelect.add(new Option('Mobile', 'mobile'));
          subCategorySelect.add(new Option('Refrigerator', 'refrigerator'));
        } else if (categorySelect.value === 'food') {
          subCategorySelect.add(new Option('Pizza', 'pizza'));
          subCategorySelect.add(new Option('Burger', 'burger'));
        }
        else if (categorySelect.value === 'stationary') {
          subCategorySelect.add(new Option('Pencil', 'pencil'));
          subCategorySelect.add(new Option('Notebook', 'notebook'));
        }
      }

      let products = [
        {
            "id": 1,
            "name": "wjiefn",
            "category": "electronics",
            "subCategory": "mobile",
            "price": 59.79,
            "stockQuantity": 37,
            "manufacturingDate": "2024-05-15T00:00:00.000Z",
            "expiryDate": "2024-05-24T00:00:00.000Z"
        },
        {
          "id": 2,
          "name": "wjiefn",
          "category": "electronics",
          "subCategory": "mobile",
          "price": 59.79,
          "stockQuantity": 37,
          "manufacturingDate": "2024-05-15T00:00:00.000Z",
          "expiryDate": "2024-05-24T00:00:00.000Z"
      }
    ];
      let nextProductId = 1;
      let deletedProductIds = [];

      // Add Parent Task
      const productForm = document.getElementById('productForm');
      productForm.addEventListener('submit', addProduct);

      // Add event listeners for input fields to validate input and display errors dynamically
      document.getElementById('productId').addEventListener('input', validateProductInput);
      document.getElementById('productName').addEventListener('input', validateProductInput);
      document.getElementById('price').addEventListener('input', validateProductInput);
      document.getElementById('stockQuantity').addEventListener('input', validateProductInput);
      document.getElementById('manufacturingDate').addEventListener('input', validateProductInput);
      document.getElementById('expiryDate').addEventListener('input', validateProductInput);

      // Function to validate input for adding a parent task
      function validateProductInput() {
        const productId = document.getElementById('productId').value.trim();
        const productName = document.getElementById('productName').value.trim();
        const stockQuantity = document.getElementById('stockQuantity').value.trim();
        const price = document.getElementById('price').value.trim();
        const manufacturingDate = document.getElementById('manufacturingDate').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const errors = validateProduct(productId, productName, stockQuantity, price, manufacturingDate, expiryDate);
        displayProductErrors(errors);
      }

      function addProduct(e) {
            e.preventDefault();
            const productId = document.getElementById('productId').value.trim();
            const productName = document.getElementById('productName').value.trim();
            const category = document.getElementById('category').value;
            const subCategory = document.getElementById('subCategory').value;
            const manufacturingDate = document.getElementById('manufacturingDate').value;
            const expiryDate = document.getElementById('expiryDate').value;
            const price = document.getElementById('price').value.trim();
            const stockQuantity = document.getElementById('stockQuantity').value.trim();
            // const stockInfo = document.getElementById('stockInfo').value;

            const isIdUsed = products.some(product => product.id === parseInt(productId));
            const isIdDeleted = deletedProductIds.includes(parseInt(productId));

            if (isIdUsed || isIdDeleted) {
                // displayErrorsAboveButton(['Product ID is already in use. Please choose a different ID.']);
                displayProductErrors(['Product ID is already in use. Please choose a different ID.']);
                return;
            }

            const errors = validateProduct(productId, productName, category, subCategory, manufacturingDate, expiryDate, price, stockQuantity);
            if (errors.length === 0) {
                const newProduct = {
                    id: parseInt(productId),
                    name: productName,
                    category: category,
                    subCategory: subCategory,
                    price: parseFloat(price),
                    stockQuantity: parseInt(stockQuantity),
                    // stockInfo: stockInfo,
                    manufacturingDate: new Date(manufacturingDate),
                    expiryDate: new Date(expiryDate)
                };
                products.push(newProduct);
                renderProductList();
                clearProductForm();
                // displayProductErrors({});
                
            } else {
                displayProductErrors(errors);
            }
            console.log(products);
        }

      // Utility Functions
      function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

      function clearProductForm() {
        document.getElementById('productId').value = '';
        document.getElementById('productName').value = '';
        document.getElementById('price').value = '';
        document.getElementById('stockQuantity').value = '';
        document.getElementById('manufacturingDate').value = '';
        document.getElementById('expiryDate').value = '';
        document.getElementById('category').value = '';
        document.getElementById('subCategory').value = '';
      }

      function displayProductErrors(errors) {
        const errorContainers = {
          productId: document.getElementById('productIdError'),
          productName: document.getElementById('productNameError'),
          category: document.getElementById('categoryError'),
          subCategory: document.getElementById('subCategoryError'),
          price: document.getElementById('priceError'),
          stockQuantity: document.getElementById('stockQuantityError'),
          manufacturingDate: document.getElementById('manufacturingDateError'),
          expiryDate: document.getElementById('expiryDateError')
        };

        // Clear all error containers
        for (const container of Object.values(errorContainers)) {
          container.innerHTML = '';
        }

        // Display errors in their respective containers
        for (const error of errors) {
          if (error.includes('Product ID')) {
            const errorElement = document.createElement('p');
            errorElement.textContent = error;
            errorContainers.productId.appendChild(errorElement);
          } else if (error.includes('Product Name')) {
            const errorElement = document.createElement('p');
            errorElement.textContent = error;
            errorContainers.productName.appendChild(errorElement);
          } else if (error.includes('Category')) {
            const errorElement = document.createElement('p');
            errorElement.textContent = error;
            errorContainers.category.appendChild(errorElement);
          } else if (error.includes('Sub-category')) {
            const errorElement = document.createElement('p');
            errorElement.textContent = error;
            errorContainers.subCategory.appendChild(errorElement);
          } else if (error.includes('Manufacturing Date')) {
            const errorElement = document.createElement('p');
            errorElement.textContent = error;
            errorContainers.manufacturingDate.appendChild(errorElement);
            errorContainers.expiryDate.appendChild(errorElement.cloneNode(true));
          } 
        }
      }

      function displayErrors(errors) {
        const errorMessagesContainer = document.getElementById('errorMessages');
        errorMessagesContainer.innerHTML = '';

        errors.forEach(error => {
          const errorElement = document.createElement('p');
          errorElement.textContent = error;
          errorMessagesContainer.appendChild(errorElement);
        });
      }

      function deleteProduct(productId) {
        const index = products.findIndex(product => product.id === productId);
        if (index !== -1) {
          products.splice(index, 1);
          deletedProductIds.push(productId); // Add to deleted IDs array
          renderProductList();
        }
      }

      // Render Product List
      function renderProductList() {
        const productListContainer = document.getElementById('productList');
        productListContainer.innerHTML = '';

        // products.forEach(product => {
        //   const productElement = document.createElement('div');
        //   productElement.classList.add('product-details');

        if (products.length === 0) {
        productListContainer.innerHTML = '<p>No products available.</p>';
        return;
    }

    const table = document.createElement('table');
    table.setAttribute('border', '1');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Sub-category</th>
                <th>Manufacturing Date</th>
                <th>Expiry Date</th>
                <th>Price</th>
                <th>Stock Quantity</th>
                <th>Actions TO BE PERFORM</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            ${products.map(product => `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td><span class="category-${product.category}">${capitalizeFirstLetter(product.category)}</span></td>
                    <td><span class="subCategory-${product.subCategory}">${capitalizeFirstLetter(product.subCategory)}</span></td>
                    <td>${formatDate(product.manufacturingDate)}</td>
                    <td>${formatDate(product.expiryDate)}</td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td>${product.stockQuantity}</td>
                    <td>
                    <P><button class="edit-button" onclick="editProduct(${product.id})">Edit</button>
                    <button class="delete-button" onclick="deleteProduct(${product.id})">Delete</button></P>
                    </td>
                    <td style="color: ${product.stockQuantity > 0 ? 'green' : 'red'};">
                            ${product.stockQuantity > 0 ? 'Available' : 'Out of Stock'}
                        </td>
                    
                </tr>
            `).join('')}
        </tbody>
    `;
    productListContainer.appendChild(table);
      }
      
      // Validate Product Function
      function validateProduct(productId, productName, category, subCategory, manufacturingDate, expiryDate, price, stockQuantity) {
        const errors = [];

        // Validate Product ID
        if (isNaN(productId) || productId.trim() === '') {
          errors.push('Product ID must be a number and cannot be empty.');
        } else if (products.some(product => product.id === parseInt(productId))) {
          errors.push('Product ID already exists.');
        }

        // Validate Product Name
        if (!/^[a-zA-Z\s]+$/.test(productName)) {
          errors.push('Product Name must contain only alphabets and spaces.');
        }

        // Validate Category
        if (!category) {
          errors.push('Category is required.');
        }

        // Validate Sub-Category
        if (!subCategory) {
          errors.push('Sub-Category is required.');
        }

          // Validate Stock Quantity
          if (!stockQuantity) {
              errors.push('Stock Quantity is required.');
            } else {
              const quantity = parseInt(stockQuantity);
              if (isNaN(quantity) || quantity < 0) {
                errors.push('Stock Quantity must be a valid non-negative integer.');
              }
            }
          
            // Validate Price
            if (!price) {
              errors.push('Price is required.');
            } else {
              const priceValue = parseFloat(price);
              if (isNaN(priceValue) || priceValue <= 0) {
                errors.push('Price must be a valid positive number.');
              }
            }
          
            // Validate Manufacturing Date and Expiry Date
            const manufacturingDateObj = new Date(manufacturingDate);
            const expiryDateObj = new Date(expiryDate);
          
            if (isNaN(manufacturingDateObj.getTime())) {
              errors.push('Manufacturing Date is not valid.');
            }
          
            if (isNaN(expiryDateObj.getTime())) {
              errors.push('Expiry Date is not valid.');
            }
          
            if (manufacturingDateObj >= expiryDateObj) {
              errors.push('Manufacturing Date must be before Expiry Date.');
            }
          
            return errors;
          }
          
          function editProduct(id) {
            const productIndex = products.findIndex(p => p.id === id);
            if (productIndex !== -1) {
                const product = products.splice(productIndex, 1)[0]; // Remove the product from the list
                document.getElementById('productId').value = product.id;
                document.getElementById('productName').value = product.name;
                document.getElementById('category').value = product.category; // Assuming you have a category select element
                updateSubCategoryOptions(); // Update sub-category options based on the selected category
                document.getElementById('subCategory').value = product.subCategory;
                document.getElementById('manufacturingDate').value = formatDate(product.manufacturingDate);
                document.getElementById('expiryDate').value = formatDate(product.expiryDate);
                document.getElementById('price').value = product.price;
                document.getElementById('stockQuantity').value = product.stockQuantity;
            }
        }
        


        // delete product from array   
          function deleteProduct(productId) {
            const index = products.findIndex(product => product.id === productId);
            if (index !== -1) {
              products.splice(index, 1);
              deletedProductIds.push(productId); // Add to deleted IDs array
              renderProductList();
            }
          }
    
          

    




    let orders = [];

    document.getElementById('placeOrderButton').addEventListener('click', showOrderForm);
    document.getElementById('viewOrdersButton').addEventListener('click', renderOrderList);
    // document.getElementById('viewProductsButton').addEventListener('click', showProductForm);
    document.getElementById('orderProductId').addEventListener('change', fillOrderForm);
    document.getElementById('orderForm').addEventListener('submit', placeOrder);

    function showOrderForm() {
        const orderProductIdSelect = document.getElementById('orderProductId');
        orderProductIdSelect.innerHTML = '<option value="">Select Product ID</option>';
        products.forEach(product => {
            const option = document.createElement('option'); 
            option.value = product.id;
            option.textContent = product.id;  // Assuming you want to display the product ID
            orderProductIdSelect.appendChild(option);
        });

        document.getElementById('orderFormContainer').style.display = 'block';
    }
    
    // document.getElementById('form-Container').style.display = 'block';
    function fillOrderForm() {
        const selectedProductId = parseInt(document.getElementById('orderProductId').value);
        const product = products.find(p => p.id === selectedProductId);

        if (product) {
            document.getElementById('orderProductName').value = product.name;
            document.getElementById('orderCategory').value = product.category;
            document.getElementById('orderSubCategory').value = product.subCategory;
            document.getElementById('orderManufacturingDate').value = formatDate(product.manufacturingDate);
            document.getElementById('orderExpiryDate').value = formatDate(product.expiryDate);
            document.getElementById('orderPrice').value = product.price.toFixed(2);
        }
    }

    function placeOrder(e) {
        e.preventDefault();

        const orderProductId = parseInt(document.getElementById('orderProductId').value);
        const orderedQuantity = parseInt(document.getElementById('orderStockQuantity').value);

        const orderedProduct = products.find(product => product.id === orderProductId);

        if (orderedProduct) {
            if (orderedQuantity > 0 && orderedQuantity <= orderedProduct.stockQuantity) {
                orderedProduct.stockQuantity -= orderedQuantity;

                const order = {
                    id: orderedProduct.id,
                    name: orderedProduct.name,
                    category: orderedProduct.category,
                    subCategory: orderedProduct.subCategory,
                    manufacturingDate: orderedProduct.manufacturingDate,
                    expiryDate: orderedProduct.expiryDate,
                    price: orderedProduct.price,
                    stockQuantity: orderedQuantity
                };
                orders.push(order);

                renderProductList();
            } else {
                alert('Invalid ordered quantity!');
            }
        }

        document.getElementById('orderForm').reset();
        document.getElementById('orderFormContainer').style.display = 'none';
    }

    function renderOrderList() {
        const orderListContainer = document.getElementById('orderListContainer');
        orderListContainer.innerHTML = '';

        if (orders.length === 0) {
            orderListContainer.innerHTML = '<p>No orders placed.</p>';
            return;
        }
        
        const table = document.createElement('table');
        table.setAttribute('border', '1');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Sub-category</th>
                    <th>Manufacturing Date</th>
                    <th>Expiry Date</th>
                    <th>Price</th>
                    <th>Stock Quantity</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${orders.map(order => `
                    <tr>
                        <td>${order.id}</td>
                        <td>${order.name}</td>
                        <td>${capitalizeFirstLetter(order.category)}</td>
                        <td>${capitalizeFirstLetter(order.subCategory)}</td>
                        <td>${formatDate(order.manufacturingDate)}</td>
                        <td>${formatDate(order.expiryDate)}</td>
                        <td>$${order.price.toFixed(2)}</td>
                        <td>${order.stockQuantity}</td>
                        <td style="color: ${order.stockQuantity > 0 ? 'green' : 'red'};">
                            ${order.stockQuantity > 0 ? 'Available' : 'Out of Stock'}
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        orderListContainer.appendChild(table);
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function formatDate(date) {
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    }


function updateProductIdInOrderHistory(oldProductId, newProductId) {
     orders.forEach(transaction =>
      { if (transaction.productId === oldProductId) 
        { transaction.productId = newProductId; } }); 
    }




  // Event listener for product search button click
document.getElementById('productSearchButton').addEventListener('click', searchProducts);

// Function to handle product search
function searchProducts() {
    const searchKeyword = document.getElementById('productSearchInput').value.trim().toLowerCase();

    // Filter products based on the search keyword
    const filteredProducts = products.filter(product => {
        return Object.values(product).some(value =>
            String(value).toLowerCase().includes(searchKeyword)
        );
    });

    // Render the filtered product list
    renderFilteredProductList(filteredProducts);
    console.log('Filtered products:', filteredProducts);
}

// Function to render filtered product list
function renderFilteredProductList(filteredProducts) {
    const productListContainer = document.getElementById('productList');
    productListContainer.innerHTML = '';

    if (filteredProducts.length === 0) {
        productListContainer.innerHTML = '<p>No matching products found.</p>';
        return;
    }

    const table = document.createElement('table');
    table.setAttribute('border', '1');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Sub-category</th>
                <th>Manufacturing Date</th>
                <th>Expiry Date</th>
                <th>Price</th>
                <th>Stock Quantity</th>
                <th>Actions</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            ${filteredProducts.map(product => `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td><span class="category-${product.category}">${capitalizeFirstLetter(product.category)}</span></td>
                    <td><span class="subCategory-${product.subCategory}">${capitalizeFirstLetter(product.subCategory)}</span></td>
                    <td>${formatDate(product.manufacturingDate)}</td>
                    <td>${formatDate(product.expiryDate)}</td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td>${product.stockQuantity}</td>
                    <td>
                        <button onclick="editProduct(${product.id})">Edit</button>
                        <button onclick="deleteProduct(${product.id})">Delete</button>
                    </td>
                    <td style="color: ${product.stockQuantity > 0 ? 'green' : 'red'};">
                            ${product.stockQuantity > 0 ? 'Available' : 'Out of Stock'}
                        </td>
                </tr>
            `).join('')}
        </tbody>
    `;
    productListContainer.appendChild(table);
}

    document.addEventListener('DOMContentLoaded', function() {
      // Add event listener to the "Add Product" button
      const viewProductsButton = document.getElementById('viewProductsButton');
      const productFormContainer = document.querySelector('.form-container');
    
      viewProductsButton.addEventListener('click', function() {
        // Set the display style of the form container to 'block'
        productFormContainer.style.display = 'block';
      });
    });
    


    // function sortProductsDropdown() {
    //   const sortCriteria = document.getElementById('sortCriteriaDropdown').value;
    //   sortProducts(sortCriteria);
    // }
    
    // Function to sort products based on selected field and direction
// function sortProducts() {
//   const sortField = document.getElementById('sortField').value;
//   const sortDirection = document.getElementById('sortDirection').value;

//   // Toggle sort direction
//   const direction = sortDirection === 'asc' ? 1 : -1;

//   // Sort the products array based on the selected field and direction
//   products.sort((a, b) => {
//     const aValue = String(a[sortField]).toLowerCase();
//     const bValue = String(b[sortField]).toLowerCase();
//     if (aValue < bValue) {
//       return -1 * direction;
//     } else if (aValue > bValue) {
//       return 1 * direction;
//     } else {
//       return 0;
//     }
//   });

//   // Render the sorted product list
//   renderProductList();
// }

// Function to sort products based on selected field and direction
function sortProducts() {
  const sortField = document.getElementById('sortField').value;
  const sortDirection = document.getElementById('sortDirection').value;

  // Toggle sort direction
  const direction = sortDirection === 'asc' ? 1 : -1;

  // Sort the products array based on the selected field and direction
  products.sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    // If the sort field is 'id', parse it as an integer
    if (sortField === 'id') {
      aValue = parseInt(aValue);
      bValue = parseInt(bValue);
    }

    if (aValue < bValue) {
      return -1 * direction;
    } else if (aValue > bValue) {
      return 1 * direction;
    } else {
      return 0;
    }
  });

  // Render the sorted product list
  renderProductList();
}


    



document.addEventListener('DOMContentLoaded', function() {
  // Function to extract URL parameter by name
  function getUrlParameter(name) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      const results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  // Get the username from the URL
  const username = getUrlParameter('username');

  // Display the username on the page
  const usernameDisplay = document.getElementById('usernameDisplay');
  if (username) {
      usernameDisplay.textContent = `Welcome, ${username}!`;
  } else {
      usernameDisplay.textContent = 'Welcome!';
  }
});

// Event listener for sorting criteria change
document.getElementById('orderSortCriteria').addEventListener('change', sortOrders);

// Function to sort orders based on the selected criteria
function sortOrders() {
    const sortCriteria = document.getElementById('orderSortCriteria').value;

    // Check if sortCriteria is a valid property
    if (!orders[0].hasOwnProperty(sortCriteria)) {
        console.error('Invalid sort criteria:', sortCriteria);
        return;
    }

    orders.sort((a, b) => {
        // Ensure that the values being compared are strings
        const aValue = String(a[sortCriteria]).toLowerCase();
        const bValue = String(b[sortCriteria]).toLowerCase();
        // Compare the values
        return aValue.localeCompare(bValue);
    });

    // After sorting, render the order list
    renderOrderList();
}


// Event listener for search button click
document.getElementById('orderSearchButton').addEventListener('click', searchOrders);

// Function to handle order search
function searchOrders() {
    const searchCriteria = document.getElementById('orderSearchCriteria').value;
    const searchKeyword = document.getElementById('orderSearchInput').value.trim().toLowerCase();

    // Filter orders based on the search criteria and keyword
    const filteredOrders = orders.filter(order => {
        // Convert the field value to lower case for case-insensitive comparison
        const fieldValue = String(order[searchCriteria]).toLowerCase();
        return fieldValue.includes(searchKeyword);
    });

    // Render the filtered order list
    renderFilteredOrderList(filteredOrders);
}

// Function to render filtered order list
function renderFilteredOrderList(filteredOrders) {
    const orderListContainer = document.getElementById('orderListContainer');
    orderListContainer.innerHTML = '';

    if (filteredOrders.length === 0) {
        orderListContainer.innerHTML = '<p>No matching orders found.</p>';
        return;
    }

    const table = document.createElement('table');
    table.setAttribute('border', '1');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Sub-category</th>
                <th>Manufacturing Date</th>
                <th>Expiry Date</th>
                <th>Price</th>
                <th>Stock Quantity</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            ${filteredOrders.map(order => `
                <tr>
                    <td>${order.id}</td>
                    <td>${order.name}</td>
                    <td>${capitalizeFirstLetter(order.category)}</td>
                    <td>${capitalizeFirstLetter(order.subCategory)}</td>
                    <td>${formatDate(order.manufacturingDate)}</td>
                    <td>${formatDate(order.expiryDate)}</td>
                    <td>$${order.price.toFixed(2)}</td>
                    <td>${order.stockQuantity}</td>
                    <td style="color: ${order.stockQuantity > 0 ? 'green' : 'red'};">
                        ${order.stockQuantity > 0 ? 'Available' : 'Out of Stock'}
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;
    orderListContainer.appendChild(table);
}

// document.getElementById(sortOrders).style.display="block";

// document.getElementById('toggleOrderOptionsButton').addEventListener('click', function() {
//   const orderOptionsContainer = document.getElementById('sortOrders');
//   if (orderOptionsContainer.style.display === 'none' || orderOptionsContainer.style.display === '') {
//       orderOptionsContainer.style.display = 'block';
//   } else {
//       orderOptionsContainer.style.display = 'none';
//   }
// });

