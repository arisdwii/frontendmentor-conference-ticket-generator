// Import image uploader module and initialize it
import { initImageUploader } from "./handleUploadImg.js";
initImageUploader();

// DOM elements
const heroSection = document.querySelector(".hero-section");
const ticketForm = document.querySelector(".ticket-form");

// Input fields
const inputUploadImg = document.getElementById("upload-img");
const inputFullName = document.getElementById("full-name");
const inputEmail = document.getElementById("email");
const inputGithubUser = document.getElementById("github-username");

// Feedback and output elements
const emailMsg = document.querySelector(".email-msg");
const generatedTicketSection = document.querySelector(
  ".generated-ticket-section"
);
const userFullName = document.querySelector(".user-fullname");
const githubHandle = document.querySelector(".github-handle");
const ticketId = document.querySelector(".ticket-id");

// Email validation regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Event listener for form submission
ticketForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const fileImg = inputUploadImg.files[0];

  // Basic validation: ensure all fields are filled
  if (!fileImg || !inputFullName || !inputEmail || !inputGithubUser) {
    return;
  }

  // Validate email format
  if (!emailRegex.test(inputEmail.value)) {
    emailMsg.closest(".form-group").classList.add("error");
    emailMsg.textContent = "Please enter a valid email address.";
    return;
  }

  // Hide form and show ticket section
  heroSection.style.display = "none";
  generatedTicketSection.style.display = "block";

  // Populate ticket content with user input
  userFullName.textContent = inputFullName.value.trim();
  githubHandle.textContent = formatGithubUsername(inputGithubUser.value.trim());
  ticketId.textContent = `#${getRandomTicketId()}`;
});

// Format GitHub username (ensure it starts with @)
function formatGithubUsername(username) {
  return username.startsWith("@") ? username : `@${username}`;
}

// Generate a 6-digit random ticket ID
function getRandomTicketId() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Clear email error state on input change
inputEmail.addEventListener("input", () => {
  emailMsg.closest(".form-group").classList.remove("error");
  emailMsg.textContent = "";
});
