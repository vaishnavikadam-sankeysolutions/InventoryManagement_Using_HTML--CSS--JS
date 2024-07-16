let products = [];
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
  const errors = validateProduct(productId, productName,stockQuantity, price,  manufacturingDate, expiryDate);
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



  // Check if the ID is already used by an existing task
  const isIdUsed = products.some(product => product.id === parseInt(productId));
  // Check if the ID is already used by a deleted task
  const isIdDeleted = deletedProductIds.includes(parseInt(productId));

  if (isIdUsed || isIdDeleted) {
    displayErrorsAboveButton(['Product ID is already in use. Please choose a different ID.']);
    return; // Exit the function if ID is already in use
  }
  const errors = validateProduct(productId, productName, category, subCategory, manufacturingDate, expiryDate, price, stockQuantity);
  if (errors.length === 0) {
    const newProduct = {
      id: parseInt(productId),
      name: productName,
      category: category,
      subCategory: subCategory,
      price: price,
      stockQuantity: stockQuantity,
      startDate: new Date(manufacturingDate),
      endDate: new Date(expiryDate),
      status: productStatus,
    };
    products.push(newProduct);
    nextProductId++;
    renderProductList();
    clearProductForm();
    displayProductErrors({});
  } else {
    displayProductErrors(errors);
  }
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
    }else if (error.includes('Sub-category')) {
      const errorElement = document.createElement('p');
      errorElement.textContent = error;
      errorContainers.subCategory.appendChild(errorElement);
    }  else if (error.includes('Manufacturing Date')) {
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

function deleteProductForm(productId) {
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

  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product-details');

    const productInfo = `
      <h3>Product ID: ${product.id}</h3>
      <p>Product Name: ${product.name}</p>
      <p>Status: <span class="category-${product.category}">${capitalizeFirstLetter(product.category)}</span></p>
      <p>Status: <span class="subCategory-${product.subCategory}">${capitalizeFirstLetter(product.subCategory)}</span></p>
      <p>Manufacturing Date: ${formatDate(product.manufacturingDate)}</p>
      <p>End Date: ${formatDate(product.expiryDate)}</p>
      <p>Status: <span class="status-${product.status}">${capitalizeFirstLetter(product.status)}</span></p>
      <button onclick="editProduct(${product.id})">Edit</button>
      <button onclick="deleteProduct(${product.id})">Delete</button>
    `;

    productElement.innerHTML = productInfo;
    productListContainer.appendChild(productElement);

  });
}

function validateProduct(productId, productName, parentTaskStartDate, parentTaskEndDate) {
  const errors = [];

  // Validate Parent Task ID
  if (isNaN(productId) || productId.trim() === '') {
    errors.push('Product ID must be a number and cannot be empty.');
  } else if (products.some(product => product.id === parseInt(productId))) {
    errors.push('Product ID already exists.');
  }

  // Validate Parent Task Name
  if (!/^[a-zA-Z\s]+$/.test(productName)) {
    errors.push('Parent Task Name must contain only alphabets and spaces.');
  }

  if (!stockQuantity) {
    errors.push('Stock Quantity is required');
  } else {
    const quantity = parseInt(stockQuantity);
    if (isNaN(quantity) || quantity < 0) {
      errors.push('Stock Quantity must be a valid non-negative integer');
    }
  }

  if (!price) {
    errors.push('Price is required');
  } else {
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      errors.push('Price must be a valid positive number');
    }
  }

  // Validate Start Date and End Date
  if (new Date(manufacturingDate) >= new Date(expiryDate)) {
    errors.push('Start Date must be before End Date.');
  }

  return errors;
}