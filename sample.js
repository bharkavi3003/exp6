let cart = [];
let totalPrice = 0;

// Sample menu data for each restaurant, now with image URLs
const menu = {
    restaurant1: [
        { name: "Margherita Pizza", price: 12.99, imgSrc: "https://via.placeholder.com/100?text=Pizza1" },
        { name: "Pepperoni Pizza", price: 14.99, imgSrc: "https://via.placeholder.com/100?text=Pizza2" },
        { name: "BBQ Chicken Pizza", price: 15.99, imgSrc: "https://via.placeholder.com/100?text=Pizza3" }
    ],
    restaurant2: [
        { name: "Classic Cheeseburger", price: 8.99, imgSrc: "https://via.placeholder.com/100?text=Burger1" },
        { name: "Bacon Burger", price: 9.99, imgSrc: "https://via.placeholder.com/100?text=Burger2" },
        { name: "Veggie Burger", price: 7.99, imgSrc: "https://via.placeholder.com/100?text=Burger3" }
    ]
};

// Function to display the menu of a selected restaurant
function viewMenu(restaurant) {
    const menuItems = menu[restaurant];
    const menuSection = document.getElementById('menuItems');
    menuSection.innerHTML = ''; // Clear previous menu

    menuItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('menu-item');
        itemDiv.innerHTML = `
            <div style="display: flex; align-items: center;">
                <img src="${item.imgSrc}" alt="${item.name}" style="width: 100px; height: 100px; margin-right: 10px;">
                <div>
                    <p>${item.name} - $${item.price.toFixed(2)}</p>
                    <button class="addToCartBtn" data-name="${item.name}" data-price="${item.price}" data-img="${item.imgSrc}">Add to Cart</button>
                </div>
            </div>
        `;
        menuSection.appendChild(itemDiv);
    });

    // Add event listeners to the dynamically created "Add to Cart" buttons
    document.querySelectorAll('.addToCartBtn').forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            const imgSrc = this.getAttribute('data-img');
            addToCart(name, price, imgSrc);
        });
    });

    // Show menu section and hide others
    document.getElementById('menuSection').style.display = 'block';
    document.querySelector('.restaurants').style.display = 'none';
}

// Function to go back to the restaurant selection
function goBack() {
    document.getElementById('menuSection').style.display = 'none';
    document.querySelector('.restaurants').style.display = 'block';
}

// Function to add item to the cart
function addToCart(name, price, imgSrc) {
    cart.push({ name, price, imgSrc });
    totalPrice += price;
    updateCart();
}

// Function to update cart display
function updateCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = ''; // Clear previous cart

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.innerHTML = `
            <div style="display: flex; align-items: center;">
                <img src="${item.imgSrc}" alt="${item.name}" style="width: 50px; height: 50px; margin-right: 10px;">
                <div>
                    <p>${item.name} - $${item.price.toFixed(2)}</p>
                </div>
            </div>
        `;
        cartItemsDiv.appendChild(cartItemDiv);
    });

    document.getElementById('totalPrice').innerText = `Total: $${totalPrice.toFixed(2)}`;
    document.getElementById('cartBtn').innerText = `Cart (${cart.length})`;
}

// Function to handle checkout
function checkout() {
    alert(`Your total is $${totalPrice.toFixed(2)}. Thank you for ordering!`);
    cart = [];
    totalPrice = 0;
    updateCart();
    document.getElementById('cartSection').style.display = 'none';
    document.querySelector('.restaurants').style.display = 'block';
}

// Function to show the cart
document.getElementById('cartBtn').addEventListener('click', () => {
    document.getElementById('cartSection').style.display = 'block';
    document.querySelector('.restaurants').style.display = 'none';
    document.getElementById('menuSection').style.display = 'none';
});
