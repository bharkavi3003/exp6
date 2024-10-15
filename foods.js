let cart = [];
let totalPrice = 0.00;

// Update cart display
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = ''; // Clear current cart items

    // Add items to cart list
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;

        // Create a remove button for each item
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromCart(index);

        li.appendChild(removeButton);
        cartItems.appendChild(li);
    });

    // Update total price
    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}

// Add item to cart
function addToCart(name, price) {
    const item = { name, price };
    cart.push(item);
    totalPrice += price;
    updateCart();
    saveCart();
}

// Remove item from cart
function removeFromCart(index) {
    const item = cart[index];
    cart.splice(index, 1);
    totalPrice -= item.price;
    updateCart();
    saveCart();
}

// Clear cart
function clearCart() {
    cart = [];
    totalPrice = 0;
    updateCart();
    saveCart();
}

// Save cart data to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));
}

// Load cart from localStorage
function loadCart() {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const storedTotalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0.00;
    
    cart = storedCart;
    totalPrice = storedTotalPrice;
    updateCart();
}

// Checkout button (just for display in this example)
function checkout() {
    alert(`Your total price is $${totalPrice.toFixed(2)}. Thank you for your order!`);
    clearCart(); // Clear cart after checkout
}

// Event listeners
document.getElementById('clearCartBtn').addEventListener('click', clearCart);
document.getElementById('checkoutBtn').addEventListener('click', checkout);

// Load cart when page loads
document.addEventListener('DOMContentLoaded', loadCart);
