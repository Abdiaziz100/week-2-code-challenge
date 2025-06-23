const guestForm = document.getElementById('guest-form');
const guestNameInput = document.getElementById('guest-name');
const guestCategorySelect = document.getElementById('guest-category');
const guestList = document.getElementById('guest-list');

let guests = [];  // Stores all guests

// Handle form submission to add a new guest
guestForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = guestNameInput.value.trim();
  const category = guestCategorySelect.value;
  if (!name || !category) return;  // Ensure both fields are filled

  if (guests.length >= 10) {
    alert('Guest list is full (10 guests max).');
    return;
  }

  // Create and store new guest object
  const guest = {
    id: Date.now(),
    name,
    category,
    attending: false,
  };
  guests.push(guest);
  renderGuestList();         // Refresh displayed list
  guestForm.reset();         // Clear form fields
});

/**
 * Renders the list of guests into the DOM.
 * Adds controls for attendance, editing, and removing.
 */
function renderGuestList() {
  guestList.innerHTML = '';

  guests.forEach((guest) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span><strong>${guest.name}</strong> (${guest.category})</span>
      <button class= "samii" onclick="toggleAttendance(${guest.id})">
        ${guest.attending ? 'Attending' : 'Not Attending'}
      </button>
      <button class="edit" onclick="editGuest(${guest.id})">Edit</button>
      <button class="dib" onclick="removeGuest(${guest.id})">Remove</button>
    `;
    guestList.appendChild(li);
  });
}

// Toggle attendance status when user clicks button
function toggleAttendance(id) {
  guests = guests.map((guest) =>
    guest.id === id ? { ...guest, attending: !guest.attending } : guest
  );
  renderGuestList();
}

// Prompt user to update a guest’s name and category
function editGuest(id) {
  const guest = guests.find((g) => g.id === id);
  const newName = prompt('Edit name:', guest.name);
  const newCategory = prompt('Edit category:', guest.category);
  if (!newName || !newCategory) return;  // Cancel if no input

  guest.name = newName.trim();
  guest.category = newCategory.trim();
  renderGuestList();
}

// Remove guest from the list
function removeGuest(id) {
  guests = guests.filter((guest) => guest.id !== id);
  renderGuestList();
}
