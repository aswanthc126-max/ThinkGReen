// SIMPLE FRONT-END STATE
const totalSeats = 60;
let booked = 15; // already reserved seats (demo)

// Single event data
const eventData = [
  {
    id: 1,
    name: "Annual College Tech & Cultural Fest",
    date: "15 Dec 2025",
    venue: "Main Auditorium, Block A",
    slot: "10:00 AM – 1:00 PM",
    desc: "Tech talks, competitions, cultural shows and more."
  }
];

const container = document.getElementById("eventsContainer");

// Payment popup elements
const popup = document.getElementById("paymentPopup");
const popupTitle = document.getElementById("popupTitle");
const popupText = document.getElementById("popupText");
const popupLoader = document.getElementById("popupLoader");
const popupSuccessIcon = document.getElementById("popupSuccessIcon");
const closePopupBtn = document.getElementById("closePopupBtn");

// Render event card
function loadEvents() {
  container.innerHTML = "";

  eventData.forEach((event, index) => {
    const seatsLeft = totalSeats - booked;

    const card = document.createElement("div");
    card.className = "event-card";
    card.style.animationDelay = `${index * 0.08}s`;

    card.innerHTML = `
      <div class="event-header">
        <div class="event-name">${event.name}</div>
        <p class="event-meta">Date: ${event.date}</p>
        <p class="event-meta">Venue: ${event.venue}</p>
        <p class="event-meta">${event.desc}</p>
        <span class="tag-pill">🎫 Slot Booking <span>OPEN</span></span>
        <p class="event-seats">Seats Left: <span>${seatsLeft}</span> / ${totalSeats}</p>
      </div>

      <label for="slot-${event.id}">Time Slot</label>
      <select id="slot-${event.id}">
        <option value="${event.slot}">${event.slot}</option>
      </select>

      <label for="name-${event.id}">Your Name</label>
      <input type="text" id="name-${event.id}" placeholder="Enter your name">

      <label for="email-${event.id}">Email</label>
      <input type="email" id="email-${event.id}" placeholder="Enter your email">

      <label for="seat-${event.id}">Number of Seats</label>
      <input type="number" id="seat-${event.id}" min="1" value="1">

      <label for="pay-${event.id}">Payment Method (Demo)</label>
      <select id="pay-${event.id}">
        <option value="UPI">UPI</option>
        <option value="Card">Card</option>
        <option value="Cash at Venue">Cash at Venue</option>
      </select>

      <button type="button" onclick="bookNow(${event.id})">
        Confirm Booking & Payment
      </button>
    `;

    container.appendChild(card);
  });
}

// Show payment demo popup
function showPaymentPopup(name, seats, method) {
  popup.classList.remove("hidden");
  popupLoader.classList.remove("hidden");
  popupSuccessIcon.classList.add("hidden");
  closePopupBtn.classList.add("hidden");

  popupTitle.textContent = "Processing Payment...";
  popupText.textContent = `Simulating ${method} payment for ${name} (${seats} seat/s).`;

  // After delay show success
  setTimeout(() => {
    popupLoader.classList.add("hidden");
    popupSuccessIcon.classList.remove("hidden");
    popupTitle.textContent = "Payment Successful (Demo)";
    popupText.textContent = `Your booking is confirmed, ${name}. ${seats} seat(s) reserved successfully.`;
    closePopupBtn.classList.remove("hidden");
  }, 1600);
}

// Called by button
window.bookNow = function (id) {
  const event = eventData.find(e => e.id === id);
  if (!event) return;

  const nameEl = document.getElementById(`name-${id}`);
  const emailEl = document.getElementById(`email-${id}`);
  const seatEl = document.getElementById(`seat-${id}`);
  const payEl = document.getElementById(`pay-${id}`);

  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const seats = parseInt(seatEl.value, 10) || 0;
  const method = payEl.value;

  const seatsLeft = totalSeats - booked;

  if (!name || !email) {
    alert("⚠ Please enter your name and email.");
    return;
  }

  if (seats <= 0) {
    alert("⚠ Number of seats must be at least 1.");
    return;
  }

  if (seats > seatsLeft) {
    alert(`❌ Only ${seatsLeft} seats left for this event.`);
    return;
  }

  // Update booked seats (front-end only)
  booked += seats;
  loadEvents();

  // Show fake payment popup
  showPaymentPopup(name, seats, method);
};

// Close popup
closePopupBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
});

// Click outside popup-card also closes
popup.addEventListener("click", (e) => {
  if (e.target === popup || e.target.classList.contains("popup-backdrop")) {
    popup.classList.add("hidden");
  }
});

// Initial load
loadEvents();