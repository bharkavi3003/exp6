// Check if user is logged in (for ads page)
if (!localStorage.getItem("loggedIn")) {
  window.location.href = "login.html"; // Redirect to login page if not logged in
}

// Function to load ads from localStorage
function loadAds() {
  const storedAds = localStorage.getItem("ads");

  if (storedAds) {
    return JSON.parse(storedAds);
  } else {
    return [];
  }
}

// Function to save ads to localStorage
function saveAds() {
  localStorage.setItem("ads", JSON.stringify(ads));
}

// Array to store ad data (loaded from localStorage)
let ads = loadAds();

// Function to handle form submission
document.getElementById("ad-form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Get form values
  const productName = document.getElementById("product-name").value;
  const productDescription = document.getElementById("product-description").value;
  const productPrice = document.getElementById("product-price").value;
  const productImage = document.getElementById("product-image").value;

  // Create ad object
  const ad = {
    name: productName,
    description: productDescription,
    price: productPrice,
    image: productImage
  };

  // Add ad to ads array
  ads.push(ad);

  // Save the updated ads array to localStorage
  saveAds();

  // Clear the form
  document.getElementById("ad-form").reset();

  // Update the ads display
  displayAds();
});

// Function to display all ads
function displayAds() {
  const adsContainer = document.getElementById("ads-container");
  adsContainer.innerHTML = ""; // Clear existing ads

  ads.forEach((ad, index) => {
    const adCard = document.createElement("div");
    adCard.classList.add("ad-card");

    adCard.innerHTML = `
      <img src="${ad.image}" alt="${ad.name}">
      <h3>${ad.name}</h3>
      <p>${ad.description}</p>
      <span>$${ad.price}</span>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;

    // Append the ad card to the ads container
    adsContainer.appendChild(adCard);
  });

  // Add event listeners to delete buttons
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach(button => {
    button.addEventListener("click", function(event) {
      const adIndex = event.target.getAttribute("data-index");
      deleteAd(adIndex);
    });
  });
}

// Function to delete an ad
function deleteAd(index) {
  // Remove the ad from the ads array
  ads.splice(index, 1);

  // Save the updated ads array to localStorage
  saveAds();

  // Update the ads display
  displayAds();
}

// Initial call to display ads (if any)
displayAds();

// Handle logout
document.getElementById('logout').addEventListener('click', function(event) {
  localStorage.removeItem('loggedIn'); // Clear the login state
  window.location.href = 'login.html'; // Redirect to login page
});
