// scripts.js

// Mock users for login (username, password)
const defaultUsers = [
    { username: "employee1", password: "password123", casualLeave: 10, medicalLeave: 5, leaveHistory: [] },
    { username: "employee2", password: "mypassword", casualLeave: 12, medicalLeave: 6, leaveHistory: [] }
];

// Store current logged-in user
let currentUser = null;

// Function to load data from localStorage
function loadUserData() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        document.getElementById('user-name').textContent = currentUser.username;
        document.getElementById('casual-leave-days').textContent = currentUser.casualLeave;
        document.getElementById('medical-leave-days').textContent = currentUser.medicalLeave;
        displayLeaveHistory();
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('dashboard-section').style.display = 'block';
    }
}

// Handle login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Find user from localStorage (default users or previously saved users)
    let user = JSON.parse(localStorage.getItem('currentUser'));

    if (!user) {
        user = defaultUsers.find(u => u.username === username && u.password === password);
    }

    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));  // Save the user data to localStorage
        document.getElementById('user-name').textContent = user.username;
        document.getElementById('casual-leave-days').textContent = user.casualLeave;
        document.getElementById('medical-leave-days').textContent = user.medicalLeave;
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('dashboard-section').style.display = 'block';
        displayLeaveHistory();
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
});

// Handle leave application
document.getElementById('leave-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const leaveType = document.getElementById('leave-type').value;
    const leaveDays = parseInt(document.getElementById('leave-days').value);
    const leaveReason = document.getElementById('leave-reason').value;

    // Check if the user has enough leave days
    if (leaveType === 'casual' && currentUser.casualLeave >= leaveDays) {
        currentUser.casualLeave -= leaveDays;
    } else if (leaveType === 'medical' && currentUser.medicalLeave >= leaveDays) {
        currentUser.medicalLeave -= leaveDays;
    } else {
        alert("You do not have enough leave days for this request.");
        return;
    }

    // Add to leave history
    const leaveRequest = {
        type: leaveType,
        days: leaveDays,
        reason: leaveReason,
        status: 'Pending' // Can be updated by admin
    };

    currentUser.leaveHistory.push(leaveRequest);

    // Save updated data to localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Update the UI
    document.getElementById('casual-leave-days').textContent = currentUser.casualLeave;
    document.getElementById('medical-leave-days').textContent = currentUser.medicalLeave;
    displayLeaveHistory();
    alert("Leave applied successfully!");
});

// Display leave history
function displayLeaveHistory() {
    const leaveHistoryContainer = document.getElementById('leave-history');
    leaveHistoryContainer.innerHTML = '';

    if (currentUser.leaveHistory.length === 0) {
        leaveHistoryContainer.innerHTML = '<p>No leaves applied yet.</p>';
    } else {
        const historyList = document.createElement('ul');
        currentUser.leaveHistory.forEach((leave, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>Leave ${index + 1}:</strong> ${leave.type} - ${leave.days} days. Reason: ${leave.reason} - Status: ${leave.status}`;
            historyList.appendChild(listItem);
        });
        leaveHistoryContainer.appendChild(historyList);
    }
}

// Handle logout
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    currentUser = null;
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('dashboard-section').style.display = 'none';
});

// On page load, try to load the user data from localStorage
window.onload = function() {
    loadUserData(); // Load user data if available
};
