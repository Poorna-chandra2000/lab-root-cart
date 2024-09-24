// Function to update the subtotal of a product
function updateSubtotal(product) {
  const price = product.querySelector('.price span').innerText;
  const quantity = product.querySelector('.quantity input').value;
  const subtotal = parseFloat(price) * parseInt(quantity);
  
  const subtotalElement = product.querySelector('.subtotal span');
  subtotalElement.innerText = subtotal.toFixed(2);

  return subtotal;
}

// Function to calculate the total of all products
function calculateAll() {
  const products = document.getElementsByClassName('product');
  let total = 0;

  for (let product of products) {
      total += updateSubtotal(product);
  }

  document.getElementById('total').innerText = total.toFixed(2);
}

// Function to remove a product from the cart
function removeProduct(event) {
  const productRow = event.currentTarget.parentNode.parentNode;
  productRow.remove();
  calculateAll(); // Update total after removing a product
}

// Function to create a new product row and append to the table
function addProduct(event) {
  event.preventDefault();
  
  const nameInput = document.getElementById('product-name');
  const priceInput = document.getElementById('product-price');
  
  const productName = nameInput.value;
  const productPrice = parseFloat(priceInput.value).toFixed(2);
  
  const tableBody = document.querySelector('#cart tbody');
  
  const newRow = document.createElement('tr');
  newRow.classList.add('product');
  
  newRow.innerHTML = `
      <td class="name"><span>${productName}</span></td>
      <td class="price">$<span>${productPrice}</span></td>
      <td class="quantity"><input type="number" value="0" min="0" placeholder="Quantity" /></td>
      <td class="subtotal">$<span>0</span></td>
      <td class="action"><button class="btn btn-remove">Remove</button></td>
  `;
  
  // Add the new product row to the cart
  tableBody.appendChild(newRow);

  // Add event listener for the new remove button
  newRow.querySelector('.btn-remove').addEventListener('click', removeProduct);

  // Clear input fields after adding
  nameInput.value = '';
  priceInput.value = '';
}

// Setup event listeners on page load
window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  const removeButtons = document.querySelectorAll('.btn-remove');
  removeButtons.forEach(button => {
      button.addEventListener('click', removeProduct);
  });

  // Event listener for adding new products
  const addProductForm = document.getElementById('add-product-form');
  addProductForm.addEventListener('submit', addProduct);
});
